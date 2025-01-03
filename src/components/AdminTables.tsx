"use client"

import { Check, Edit, X } from "lucide-react"
import { formatCurrency, formatNumber } from "@/lib/formatter"
import { ActiveProductToggle, DeleteProduct } from "@/components/ProductActions"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, Link } from "@nextui-org/react"
import { getOrdersFromUser } from "@/lib/getOrdersFromUser"

type ProductsProps = {
    id: string
    name: string
    price: number
    isAvailable: boolean
    _count: {
        orders: number
    }
}[]

export function AdminProductsTable({ products }: { products: ProductsProps }) {
    return (
        <Table className="my-5">
            <TableHeader>
                <TableColumn className="w-0"><span className="sr-only">Available for Purchase</span></TableColumn>
                <TableColumn>NAME</TableColumn>
                <TableColumn>PRICE</TableColumn>
                <TableColumn>ORDERS</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No Products Added Yet."}>
                {products.map(product => (
                    <TableRow key={product.id}>
                        <TableCell>{product.isAvailable ? <Check className="text-success" /> : <X className="text-destructive" /> }</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{formatCurrency(product.price)}</TableCell>
                        <TableCell>{formatNumber(product._count.orders)}</TableCell>
                        <TableCell>
                            <div className="relative flex items-center gap-2">
                                <Tooltip content="Edit Product"><span className="text-lg text-default-400 cursor-pointer active:opacity-50"><Link href={`/products/${product.id}/edit`}><Edit /></Link></span></Tooltip>
                                <ActiveProductToggle id={product.id} isAvailable={product.isAvailable} />
                                <DeleteProduct id={product.id} disabled={product._count.orders > 0} />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

type UserProps = {
    id: string
    email: string
    createdAt: Date
}[]

export function AdminCustomersTable({ users }: { users: UserProps }) {
    return (
        <Table>
            <TableHeader>
                <TableColumn>Customer Email</TableColumn>
                <TableColumn>Purchased Amount</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No Orders Yet."}>
                {users.map(user => (
                    <TableRow key={user.id}>
                        <TableCell>{user.email}</TableCell>
                        {/* <TableCell>{user.email}</TableCell> */}
                        <TableCell>{getOrdersFromUser(user.id).then(orders => {
                            return formatCurrency(orders.reduce((acc, order) => acc + order.price, 0))
                        })}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}