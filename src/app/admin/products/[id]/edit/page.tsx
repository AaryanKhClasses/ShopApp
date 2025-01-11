import { PageHeader } from "@/components/PageHeader"
import { ProductForm } from "@/components/ProductForm"
import db from "@/db/db"

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const product = await db.product.findUnique({ where: { id } })
    return (<>
        <PageHeader>Edit Product</PageHeader>
        <ProductForm product={product} />
    </>)
}