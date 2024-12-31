import { PageHeader } from "@/components/PageHeader"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import db from "@/db/db"
import { formatCurrency } from "@/lib/formatter"
import { MoreVertical } from "lucide-react"

export default async function AdminOrdersPage() {  
    return (
        <main>
            <PageHeader>Orders</PageHeader>
            <CustomersTable />
        </main>
    )
}

async function CustomersTable() {
    const orders = await db.order.findMany({ select: { id: true, userID: true, productID: true, price: true }, orderBy: { createdAt: "desc" } })
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Customer Email</TableHead>
                    <TableHead>Purchased Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price (Total)</TableHead>
                    <TableHead>Order Fullfilled?</TableHead>
                    <TableHead className="w-0"><span className="sr-only">Actions</span></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map(async order => (
                    <TableRow key={order.id}>
                        <TableCell>{(await db.user.findUnique({ where: { id: order.userID } }))?.email}</TableCell>
                        <TableCell>{(await db.product.findUnique({ where: { id: order.productID } }))?.name}</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>{formatCurrency((await db.product.findUnique({ where: { id: order.productID } }))?.price as number)}</TableCell>
                        <TableCell><span className="text-destructive">No</span></TableCell>
                        <TableCell><MoreVertical /><span className="sr-only">Actions</span></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}