import { Button } from "@/components/ui/button"
import db from "@/db/db"
import { formatCurrency } from "@/lib/formatter"
import { getUserSession } from "@/lib/session"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export default async function SuccessPage({ searchParams }: { searchParams: { payment_intent: string } }) {
    const paymentIntent = await stripe.paymentIntents.retrieve(searchParams.payment_intent)
    if(paymentIntent.metadata.productID == null) return notFound()
    const product = await db.product.findUnique({ where: { id: paymentIntent.metadata.productID } })
    if(product == null) return notFound()

    const user = await getUserSession()
    if(!user) return notFound()

    const isSuccess = paymentIntent.status === "succeeded"
    if(isSuccess) {
        await db.user.update({
            where: { id: user.id },
            data: { id: user.id, orders: { create: { price: product.price, productID: product.id } } }
        })
    }

    return (
        <div className="max-w-5xl w-full mx-auto space-y-8">
            <h1 className="text-4xl text-bold">{isSuccess ? "Product Payment Successful" : "Product Payment Error"}</h1>
        <div className="flex gap-4 items-center">
          <div className="aspect-video flex-shrink-0 w-1/3 relative"><Image src={product.imagePath} fill  alt={product.name} /></div>
          <div>
              <div className="text-lg">{formatCurrency(product.price)}</div>
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <div className="line-clamp-3 text-muted-foreground">{product.description}</div>
              {isSuccess ? <></> : <Button className="mt-4" size="lg" asChild><Link href={`/products/${product.id}/purchase`}>Try Again</Link></Button>}
          </div>
        </div>
      </div>
    )
}