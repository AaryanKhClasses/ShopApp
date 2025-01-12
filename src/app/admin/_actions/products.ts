"use server"

import db from "@/db/db"
import { z } from "zod"
import fs from "fs/promises"
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { put } from "@vercel/blob"

const fileSchema = z.instanceof(File, { message: "Required" })
const imageSchema = fileSchema.refine(file => file.size === 0 ||file.type.startsWith('image/'))
const addSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.coerce.number().int().min(1),
    image: imageSchema.refine(file => file.size > 0, "Required")
})
const editSchema = addSchema.extend({ image: imageSchema.optional() })

export async function addProduct(prevState: unknown, formData: FormData) {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
    if(result.success === false) return result.error.formErrors.fieldErrors
    
    const data = result.data
    const imageFile = formData.get("image") as File
    const blob = await put(imageFile.name, imageFile, { access: "public" })
    const imagePath = blob.url

    await db.product.create({ data: {
        name: data.name,
        description: data.description,
        price: data.price,
        imagePath: imagePath,
        isAvailable: true
    }})

    revalidatePath("/")
    revalidatePath("/products")
    redirect("/admin/products")
}

export async function updateProduct(id: string, prevState: unknown, formData: FormData) {
    const result = editSchema.safeParse(Object.fromEntries(formData.entries()))
    if(result.success === false) return result.error.formErrors.fieldErrors
    
    const data = result.data
    const product = await db.product.findUnique({ where: { id } })
    if(product === null) return notFound()
    
    let imagePath = product.imagePath
    if(data.image != null && data.image.size > 0) {
        const blob = await put(data.image.name, data.image, { access: "public" })
        imagePath = blob.url
    }

    await db.product.update({
        where: { id },
        data: {
            name: data.name,
            description: data.description,
            price: data.price,
            imagePath: imagePath,
        }
    })

    revalidatePath("/")
    revalidatePath("/products")
    redirect("/admin/products")
}

export async function toggleProductAvailability(id: string, isAvailable: boolean) {
    await db.product.update({ where: { id }, data: { isAvailable } })
    
    revalidatePath("/")
    revalidatePath("/products")
}

export async function deleteProduct(id: string) {
    const product = await db.product.delete({ where: { id } })
    if(product == null) return notFound()
    await fs.unlink(`public${product.imagePath}`)

    revalidatePath("/")
    revalidatePath("/products")
}