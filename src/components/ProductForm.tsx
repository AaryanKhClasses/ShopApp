"use client"
import { addProduct, updateProduct } from "@/app/admin/_actions/products"
import { useFormStatus } from "react-dom"
import { useActionState } from "react"
import { Product } from "@prisma/client"
import Image from "next/image"
import { Input, Textarea } from "@nextui-org/input"
import { Button } from "@nextui-org/button"

export function ProductForm({ product }: { product?: Product | null }) {
    const [error, action] = useActionState(product == null ? addProduct : updateProduct.bind(null, product.id), {})

    return (
        <form action={action} className="space-y-8">
            <div className="space-y-2">
                <label htmlFor="name">Name</label>
                <Input type="text" id="name" name="name" required defaultValue={product?.name || ""} />
                {error.name && <div className="text-destructive">{error.name}</div>}
            </div>
            <div className="space-y-2">
                <label htmlFor="price">Price</label>
                <Input type="number" id="price" name="price" required defaultValue={(product?.price || 0).toString() || undefined} />
                {error.price && <div className="text-destructive">{error.price}</div>}
            </div>
            <div className="space-y-2">
                <label htmlFor="description">Description</label>
                <Textarea id="description" name="description" required defaultValue={product?.description || ""} />
                {error.description && <div className="text-destructive">{error.description}</div>}
            </div>
            <div className="space-y-2">
                <label htmlFor="image">Image</label>
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