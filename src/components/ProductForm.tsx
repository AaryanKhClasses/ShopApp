"use client"
import { addProduct, updateProduct } from "@/app/admin/_actions/products"
import { useFormStatus } from "react-dom"
import { useActionState, useState } from "react"
import { Product } from "@prisma/client"
import Image from "next/image"
import { Input, Textarea } from "@nextui-org/input"
import { Button } from "@nextui-org/button"
import { ImageDown, IndianRupee, ReceiptText, SquareChartGantt } from "lucide-react"
import { formatCurrency } from "@/lib/formatter"

export function ProductForm({ product }: { product?: Product | null }) {
    const [error, action] = useActionState(product == null ? addProduct : updateProduct.bind(null, product.id), {})
    const [price, setPrice] = useState(product?.price.toString() ?? "")
    const [name, setName] = useState(product?.name ?? "")
    const [image, setImage] = useState<string | null>(null)

    const imageChange = (e: any) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <form action={action} className="space-y-8 pb-20">
            <div className="flex w-full">
                <div className="flex flex-col w-2/5">
                    <div className="space-y-2">
                        <Input endContent={
                            <div className="flex pointer-events-none items-center">
                                <span className="text-default-400 text-small"><ImageDown /></span>
                            </div>
                        } type="file" id="image" name="image" isRequired={product==null} accept="image/*" label="Image" labelPlacement="outside" className="my-4" size="lg" onChange={imageChange} />
                        {image && <div className="flex justify-center items-center w-full h-[400px] bg-default-100 p-6 rounded-lg">
                            <Image src={image} alt="Product Image" width="400" height="400" className="object-contain w-full h-full"></Image>
                        </div>}
                        {product != null && !image && <div className="flex justify-center items-center w-full h-[400px] bg-default-100 p-2 rounded-lg">
                            <Image src={product.imagePath} height="400" width="400" alt="Product Image" className="object-contain"></Image>
                        </div>}
                        {error.image && <div className="text-destructive">{error.image}</div>}
                    </div>
                    <div className="space-y-2 my-3">
                        <Input endContent={
                            <div className="flex pointer-events-none items-center">
                                <span className="text-default-400 text-small"><IndianRupee /></span>
                            </div>
                        } type="number" id="price" name="price" isRequired placeholder="Product Price Here" value={product == null ? price : (price ? price : product.price.toString())} label="Price" labelPlacement="outside" size="lg" onValueChange={setPrice} />
                        {error.price && <div className="text-destructive">{error.price}</div>}
                    </div>
                </div>
                <div className="flex flex-col w-3/5 ml-5">
                    <div className="space-y-2">
                        <Input endContent={
                            <div className="flex pointer-events-none items-center">
                                <span className="text-default-400 text-small"><SquareChartGantt /></span>
                            </div>
                        } type="text" id="name" name="name" isRequired placeholder="Product Name Here" value={product == null ? name : (name ? name : product.name)} label="Product Name" labelPlacement="outside" className="my-4" size="lg" onValueChange={setName} />
                        {error.name && <div className="text-destructive">{error.name}</div>}
                    </div>
                    <div className="space-y-2">
                        <Textarea endContent={
                            <div className="flex pointer-events-none items-center">
                                <span className="text-default-400 text-small"><ReceiptText /></span>
                            </div>
                        } id="description" name="description" isRequired defaultValue={product?.description || ""} classNames={{ input: "resize-y" }} label="Description" labelPlacement="outside" size="lg" />
                        {error.description && <div className="text-destructive">{error.description}</div>}
                    </div>
                </div>
            </div>
            <div className="flex w-full fixed bg-default bottom-0 py-2 left-0 px-2 items-center justify-between">
                <div className="flex flex-col w-full">
                    <span className="font-bold text-xl line-clamp-1">{name || "Product Name"}</span>
                    <span className="text-l">{formatCurrency(Number(price) || 0)}</span>
                </div>
                <div className="w-full"><SubmitButton /></div>
            </div>
        </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" className="w-full" color="primary" disabled={pending}>{pending ? "Saving..." : "Save Product"}</Button>
    )
}