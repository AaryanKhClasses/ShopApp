"use client"

import { TBody } from "@/app/(customerFacing)/me/cart/page"
import { formatCurrency, formatNumber } from "@/lib/formatter"
import { Tooltip } from "@nextui-org/tooltip"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table"
import { Link } from "@nextui-org/link"
import { Eye } from "lucide-react"

type OrderProps = {
    id: string
    createdAt: Date
    updatedAt: Date
    quantity: number
    price: number
    userID: string
    productID: string
    fullfilled: boolean
    product: {
        name: string
    }
}

export function UserOrdersTable({ orders }: { orders: OrderProps[] }) {
    return (
        <Table>
            <TableHeader>
                <TableColumn>Product Name</TableColumn>
                <TableColumn>Quantity</TableColumn>
                <TableColumn>Price (Total)</TableColumn>
                <TableColumn>Order Date</TableColumn>
                <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No Orders Yet."}>
                {orders.map(order => (
                        <TableRow key={order.id}>
                            <TableCell>{order.product.name}</TableCell>
                            <TableCell>{order.quantity}</TableCell>
                            <TableCell>{formatCurrency(order.price)}</TableCell>
                            <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                            <TableCell>
                                <Tooltip content="View Product"><span className="text-lg text-default-400 cursor-pointer active:opacity-50"><Link href={`/products/${order.productID}`}><Eye /></Link></span></Tooltip>
                            </TableCell>
                        </TableRow>
                    )
                )}
            </TableBody>
        </Table>
    )
}

type CartItemProps = {
    id: string
    createdAt: Date
    updatedAt: Date
    userID: string
    productID: string
}

export function UserCartTable({ cartItems }: { cartItems: CartItemProps[] }) {
    return (
        <Table>
            <TableHeader>
                <TableColumn>Product Name</TableColumn>
                <TableColumn>Quantity</TableColumn>
                <TableColumn>Price (Total)</TableColumn>
                <TableColumn className="w-0"><span className="sr-only">Actions</span></TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No Items Added to Cart Yet."}><TBody cartItems={cartItems} /></TableBody>
        </Table>
    )
}

type ProductProps = {
    id: string
    name: string
    price: number
    description: string
    isAvailable: boolean
    imagePath: string
    createdAt: Date
    updatedAt: Date
}

type ItemProps = {
    id: string
    createdAt: Date
    updatedAt: Date
    userID: string
    productID: string
}

export function CartTableBodyContents({ item, product, quantity }: { item: ItemProps, product: ProductProps, quantity: any }) {
    return (
        <TableRow key={item.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{formatNumber(quantity._count)}</TableCell>
            <TableCell>{formatCurrency(product.price as number * quantity._count)}</TableCell>
            <TableCell>
                hello
            </TableCell>
        </TableRow>
    )
}