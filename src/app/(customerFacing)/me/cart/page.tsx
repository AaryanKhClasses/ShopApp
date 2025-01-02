import { DeleteCartItem } from "@/components/CartActions"
import { PageHeader } from "@/components/PageHeader"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import db from "@/db/db"
import { formatCurrency, formatNumber } from "@/lib/formatter"
import { getUserSession } from "@/lib/session"
import { MoreVertical } from "lucide-react"
import Link from "next/link"
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
            <Label className="text-xl">Total Price: {formatCurrency(totalPrice)}</Label>
        </div>
            {cartItems.length === 0 ? "No Items" : 
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product Name</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Price (Total)</TableHead>
                            <TableHead className="w-0"><span className="sr-only">Actions</span></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody><TBody cartItems={cartItems} /></TableBody>
                </Table>
            }
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

async function TBody({ cartItems }: { cartItems: CartItemProps }) {
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
                return (
                    <TableRow key={itemID}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{formatNumber(quantity._count)}</TableCell>
                        <TableCell>{formatCurrency(product.price as number * quantity._count)}</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger><MoreVertical /><span className="sr-only">Actions</span></DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem><Link href={`/products/${product.id}/purchase`}>View Product</Link></DropdownMenuItem>
                                    <DropdownMenuItem><DeleteCartItem id={item.id} /></DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                )
            }
            return null
        }))

        return rows.filter(row => row !== null)
    } else {
        return <></>
    }
}