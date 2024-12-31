"use client"

import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { addProduct, updateProduct } from "@/app/admin/_actions/products"
import { useFormStatus } from "react-dom"
import { useActionState } from "react"
import { Product } from "@prisma/client"
import Image from "next/image"

export function ProductForm({ product }: { product?: Product | null }) {
    const [error, action] = useActionState(product == null ? addProduct : updateProduct.bind(null, product.id), {})

    return (
        <form action={action} className="space-y-8">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" name="name" required defaultValue={product?.name || ""} />
                {error.name && <div className="text-destructive">{error.name}</div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input type="number" id="price" name="price" required defaultValue={product?.price || 0} />
                {error.price && <div className="text-destructive">{error.price}</div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" required defaultValue={product?.description || ""} />
                {error.description && <div className="text-destructive">{error.description}</div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input type="file" id="image" name="image" required={product==null} accept="image/*" />
                {product != null && <Image src={product.imagePath} height="400" width="400" alt="Product Image"></Image>}
                {error.image && <div className="text-destructive">{error.image}</div>}
            </div>
            <SubmitButton />
        </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" disabled={pending}>{pending ? "Saving..." : "Save Product"}</Button>
    )
}