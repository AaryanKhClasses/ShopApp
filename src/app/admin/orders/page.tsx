import { PageHeader } from "@/components/PageHeader"
import { Label } from "@/components/ui/label"
import { ActiveToggleOrder } from "@/components/OrderActions"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import db from "@/db/db"
import { formatCurrency } from "@/lib/formatter"
import { MoreVertical } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export default async function AdminOrdersPage() {
    const orders = await db.order.findMany({ select: { id: true, userID: true, productID: true, price: true, quantity: true, fullfilled: true }, orderBy: { createdAt: "desc" } })
    return (
        <main>
            <div className="flex justify-between items-center gap-4">
                <PageHeader>Orders</PageHeader>
                {/* <div>
                    <Checkbox id="show-fullfilled" defaultChecked={true}></Checkbox>
                    <Label className="text-xl mx-1" htmlFor="show-fullfilled">Show Fullfilled</Label>
                </div> */}
            </div>
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
                            <TableCell>{order.quantity}</TableCell>
                            <TableCell>{formatCurrency((await db.product.findUnique({ where: { id: order.productID } }))?.price as number)}</TableCell>
                            <TableCell>{order.fullfilled ? <span className="text-green-500">Yes</span> : <span className="text-destructive">No</span>}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger><MoreVertical /><span className="sr-only">Actions</span></DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <ActiveToggleOrder id={order.id} isFullfilled={order.fullfilled} />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </main>
    )
}