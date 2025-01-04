import { PageHeader } from "@/components/PageHeader"
import { UserCartTable } from "@/components/UserTables"
import db from "@/db/db"
import { formatCurrency } from "@/lib/formatter"
import { getUserSession } from "@/lib/session"
import { notFound } from "next/navigation"

export default async function MyCartPage() {
    const userSession = await getUserSession()
    if(!userSession) return notFound()

    const user = await db.user.findUnique({ where: { id: userSession.id } })
    if(!user) return notFound()

    const cartItems = await fetchCartItems({ userID: userSession.id })
    const validCartItems = cartItems.filter(item => item.product !== null)
    const totalPrice = cartItems.reduce((acc, item) => acc + ((item.product?.price as number ?? 0) * (item.quantity._count ?? 0)), 0)

    return (
        <main>
        <div className="flex justify-between items-center gap-4">
            <PageHeader>My Cart:</PageHeader>
            <h3 className="text-xl">Total Price: {formatCurrency(totalPrice)}</h3>
        </div>
            <UserCartTable cartItems={validCartItems} />
        </main>
    )
}

async function fetchCartItems({ userID }: { userID: string }) {
    const cartItems = await db.cartItem.findMany({ where: { userID: userID }, orderBy: { createdAt: "desc" } })
    const uniqueItemsMap = new Map<string, typeof cartItems[0]>()
    for(const item of cartItems) {
        if(!uniqueItemsMap.has(item.productID)) uniqueItemsMap.set(item.productID, item)
    }
    const uniqueItems = Array.from(uniqueItemsMap.values())

    const getCartItems = await Promise.all(
        uniqueItems.map(async item => {
            const product = await db.product.findUnique({ where: { id: item.productID } })
            const quantity = await db.cartItem.aggregate({ where: { productID: item.productID, userID: userID }, _count: true })
            return { ...item, product, quantity }
        })
    )

    return getCartItems
}