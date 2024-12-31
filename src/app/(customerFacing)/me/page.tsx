import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import db from "@/db/db"
import { formatCurrency, formatNumber } from "@/lib/formatter"
import { getUserSession } from "@/lib/session"
import { MoreVertical } from "lucide-react"
import { notFound } from "next/navigation"

export default async function MePage() {
    const userSession = await getUserSession()
    if(!userSession) return notFound()

    const user = await db.user.findUnique({ where: { id: userSession.id },
        select: { email: true, name: true, orders: {
            select: { price: true, id: true, createdAt: true, product: {
                select: { id: true, name: true, imagePath: true, description: true }
            } }
        } } 
    })
    if(!user) return notFound()

    const orders = await db.order.findMany({ where: { userID: userSession.id }, orderBy: { createdAt: "desc" } })

    return (
        <main>
            <div id="my-orders">
                <h1 className="text-3xl text-bold">My Orders:</h1>
                {orders.length === 0 ? "No Orders" : 
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Price (Total)</TableHead>
                                <TableHead>Order Date</TableHead>
                                <TableHead className="w-0"><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map(async order => (
                                <TableRow key={order.id}>
                                    <TableCell>{(await db.product.findUnique({ where: { id: order.productID } }))?.name}</TableCell>
                                    <TableCell>1</TableCell>
                                    <TableCell>{formatCurrency(order.price)}</TableCell>
                                    <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                                    <TableCell><MoreVertical /><span className="sr-only">Actions</span></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                }
            </div>
            <hr />
            <div id="account">
                <h1 className="text-3xl text-bold">My Account:</h1>
            </div>
            {/* <div>{JSON.stringify(user)}</div> */}
        </main>
    )
}
