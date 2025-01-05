"use client"

import { formatCurrency, formatNumber } from "@/lib/formatter"
import { Tooltip } from "@nextui-org/tooltip"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table"
import { Link } from "@nextui-org/link"
import { Eye } from "lucide-react"
import { DeleteCartItem } from "./CartActions"

// User Orders Table

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

// User Cart Table

type CartItemProps = {
    id: string
    createdAt: Date
    updatedAt: Date
    userID: string
    productID: string
    product: {
        id: string
        name: string
        price: number
        description: string
        isAvailable: boolean
        imagePath: string
        createdAt: Date
        updatedAt: Date
    } | null
    quantity: {
        _count: number
    }
}

export function UserCartTable({ cartItems }: { cartItems: CartItemProps[] }) {
    return (
        <Table>
            <TableHeader>
                <TableColumn>Product Name</TableColumn>
                <TableColumn>Quantity</TableColumn>
                <TableColumn>Price (Total)</TableColumn>
                <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No Items Added to Cart Yet."}>
                {cartItems.map(item => {
                    if(!item.product) return <></>
                    return (
                        <TableRow key={item.id}>
                            <TableCell>{item.product.name}</TableCell>
                            <TableCell>{formatNumber(item.quantity._count)}</TableCell>
                            <TableCell>{formatCurrency(item.product.price * item.quantity._count)}</TableCell>
                            <TableCell className="relative flex items-center gap-2">
                                <Tooltip content="View Product"><span className="text-lg text-default-400 cursor-pointer active:opacity-50"><Link href={`/products/${item.productID}`}><Eye /></Link></span></Tooltip>
                                <DeleteCartItem id={item.id} />
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}