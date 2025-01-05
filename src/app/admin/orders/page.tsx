import { AdminOrdersTable } from "@/components/AdminTables"
import { PageHeader } from "@/components/PageHeader"
import db from "@/db/db"

export default async function AdminOrdersPage() {
    const orders = await fetchOrders()
    return (
        <main>
            <div className="flex justify-between items-center gap-4">
                <PageHeader>Orders</PageHeader>
                {/* <div>
                    <Checkbox id="show-fullfilled" defaultChecked={true}></Checkbox>
                    <Label className="text-xl mx-1" htmlFor="show-fullfilled">Show Fullfilled</Label>
                </div> */}
            </div>
            <AdminOrdersTable orders={orders} />
        </main>
    )
}

async function fetchOrders() {
    const orders = await db.order.findMany({ select: { id: true, userID: true, productID: true, price: true, quantity: true, fullfilled: true }, orderBy: { createdAt: "desc" } })

    const getOrders = await Promise.all(
        orders.map(async order => {
            const user = await db.user.findUnique({ where : { id: order.userID } }).then(data => data?.email)
            const productName = await db.product.findUnique({ where: { id: order.productID } }).then(data => data?.name)
            const productPrice = await db.product.findUnique({ where: { id: order.productID } }).then(data => data?.price)
            return { ...order, user, productName, productPrice }
        })
    )

    return getOrders
}