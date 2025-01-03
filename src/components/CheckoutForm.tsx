"use client"

import { Product } from "@prisma/client"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { formatCurrency } from "@/lib/formatter"
import { Button } from "@nextui-org/button"
import { FormEvent, useState } from "react"
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card"
import { Image } from "@nextui-org/image"

type CheckoutFormProps = {
    product: Product
    clientSecret: string
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)

export function CheckoutForm({ product, clientSecret }: CheckoutFormProps) {
    return (
        <div className="max-w-5xl w-full mx-auto space-y-8">
          <div className="flex gap-4 items-center">
            <div className="aspect-video flex-shrink-0 w-1/3 relative"><Image src={product.imagePath} alt={product.name} /></div>
            <div>
                <div className="text-lg">{formatCurrency(product.price)}</div>
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <div className="line-clamp-3 text-muted-foreground">{product.description}</div>
            </div>
          </div>
          <Elements options={{ clientSecret }} stripe={stripePromise}>
            <Form price={product.price} />
          </Elements>
        </div>
      )
}

function Form({ price }: { price: number }) {
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string>()

    function submit(e: FormEvent) {
        e.preventDefault()
        console.log("es")
        if(stripe == null || elements == null) return

        setIsLoading(true)

        stripe.confirmPayment({ elements, confirmParams: { return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/payment_success` } })
        .then(({ error }) => {
            if(error.type === "card_error" || error.type === "validation_error") setErrorMessage(error.message)
            else setErrorMessage("An Unknown Error Occurred.")
        }).finally(() => setIsLoading(false))
    }


    return <form onSubmit={submit}>
        <Card>
            <CardHeader>
                <h2 className="text-xl">Checkout</h2>
                {errorMessage && <small className="text-destructive text-bold text-large">{errorMessage}</small>}
            </CardHeader>
            <CardBody><PaymentElement /></CardBody>
            <CardFooter><Button type="submit" size="lg" className="w-full" disabled={stripe == null || elements == null || isLoading}>{isLoading ? "Purchasing..." : `Purchase - ${formatCurrency(price)}`}</Button></CardFooter>
        </Card>
    </form>
}