import { UserOrdersTable } from "@/components/UserTables"
import { PageHeader } from "@/components/PageHeader"
import db from "@/db/db"
import { getUserSession } from "@/lib/session"
import { notFound } from "next/navigation"

export default async function MyOrdersPage() {
    const userSession = await getUserSession()
    if(!userSession) return notFound()

    const user = await db.user.findUnique({ where: { id: userSession.id },
        select: { email: true, name: true, orders: {
            select: { price: true, id: true, createdAt: true, updatedAt: true, quantity: true, userID: true, productID: true, fullfilled: true, product: {
                select: { id: true, name: true, imagePath: true, description: true }
            } }
        } } 
    })
    if(!user) return notFound()

    const ordersWithProducts = user.orders.map((order) => ({
        id: order.id,
        price: order.price,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        fullfilled: order.fullfilled,
        quantity: order.quantity,
        userID: order.userID,
        productID: order.productID,
        product: {
            name: order.product.name,
        }
    }))

    return (
        <main>
            <PageHeader>My Orders:</PageHeader>
            <UserOrdersTable orders={ordersWithProducts} />
        </main>
    )
}
