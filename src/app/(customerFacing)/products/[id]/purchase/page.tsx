import { CheckoutForm } from "@/components/CheckoutForm"
import db from "@/db/db"
import { notFound } from "next/navigation"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export default async function PurchasePage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const product = await db.product.findUnique({ where: { id } })
    if(product === null) return notFound()

    const paymentIntent = await stripe.paymentIntents.create({
        amount: product.price*100,
        currency: "INR",
        metadata: { productID: product.id }
    })

    if(paymentIntent.client_secret == null) throw new Error("Stripe Failed to Create Payment Intent")

    return <CheckoutForm product={product} clientSecret={paymentIntent.client_secret} />
}