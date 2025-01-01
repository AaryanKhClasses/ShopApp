"use client"

import { Product } from "@prisma/client"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import Image from "next/image"
import { formatCurrency } from "@/lib/formatter"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { FormEvent, useState } from "react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

type CheckoutFormProps = {
    product: Product
    clientSecret: string
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)

export function CheckoutForm({ product, clientSecret }: CheckoutFormProps) {
    return (
        <div className="max-w-5xl w-full mx-auto space-y-8">
          <div className="flex gap-4 items-center">
            <div className="aspect-video flex-shrink-0 w-1/3 relative"><Image src={product.imagePath} fill alt={product.name} /></div>
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
                <CardTitle>Checkout</CardTitle>
                {errorMessage && <CardDescription className="text-destructive">{errorMessage}</CardDescription>}
            </CardHeader>
            <CardContent><PaymentElement /></CardContent>
            <CardFooter><Button size="lg" className="w-full" disabled={stripe == null || elements == null || isLoading}>{isLoading ? "Purchasing..." : `Purchase - ${formatCurrency(price)}`}</Button></CardFooter>
        </Card>
    </form>
}