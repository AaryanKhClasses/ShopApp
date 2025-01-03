import { AdminProductsTable } from "@/components/AdminTables"
import { PageHeader } from "@/components/PageHeader"
import db from "@/db/db"
import { Button } from "@nextui-org/button"
import { Link } from "@nextui-org/link"

export default async function AdminProductPage() {
    const products = await db.product.findMany({ select: { id: true, name: true, price: true, isAvailable: true, _count: { select: { orders: true } } }, orderBy: { name: "asc" } })
    return (<>
        <div className="flex justify-between items-center gap-4">
            <PageHeader>Products</PageHeader>
            <Button as={Link} href="/admin/products/new">Add Product</Button>
        </div>
        <AdminProductsTable products={products} />
    </>)
}