import { PageHeader } from "@/components/PageHeader"
import { CartTableBodyContents, UserCartTable } from "@/components/UserTables"
import db from "@/db/db"
import { formatCurrency } from "@/lib/formatter"
import { getUserSession } from "@/lib/session"
import { notFound } from "next/navigation"

export default async function MyCartPage() {
    const userSession = await getUserSession()
    if(!userSession) return notFound()

    const user = await db.user.findUnique({ where: { id: userSession.id } })
    if(!user) return notFound()

    const cartItems = await db.cartItem.findMany({ where: { userID: userSession.id }, orderBy: { createdAt: "desc" } })
    const totalPrice = await Promise.all(cartItems.map(async item => {
        const product = await db.product.findUnique({ where: { id: item.productID } })
        return product?.price || 0
    })).then(prices => prices.reduce((acc, price) => acc + price, 0))

    return (
        <main>
        <div className="flex justify-between items-center gap-4">
            <PageHeader>My Cart:</PageHeader>
            <h3 className="text-xl">Total Price: {formatCurrency(totalPrice)}</h3>
        </div>
            <UserCartTable cartItems={cartItems} />
        </main>
    )
}

type CartItemProps = {
    id: string
    createdAt: Date
    updatedAt: Date
    userID: string
    productID: string
}[]

export async function TBody({ cartItems }: { cartItems: CartItemProps }) {
    let itemID: string[] = []

    cartItems.forEach(item => {
        if (!itemID.includes(item.productID)) itemID.push(item.productID)
    })

    if (itemID.length > 0) {
        const rows = await Promise.all(itemID.map(async (itemID) => {
            const item = await db.cartItem.findFirst({ where: { productID: itemID } })
            const product = await db.product.findUnique({ where: { id: item?.productID } })
            const quantity = await db.cartItem.aggregate({ where: { productID: itemID, userID: item?.userID }, _count: true })
            if (item && product) {
                return <CartTableBodyContents product={product} item={item} quantity={quantity} />
            }
            return null
        }))

        return rows.filter(row => row !== null)
    } else {
        return <></>
    }
}