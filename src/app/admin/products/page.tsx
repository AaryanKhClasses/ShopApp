import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/PageHeader"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import db from "@/db/db"
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react"
import { formatCurrency, formatNumber } from "@/lib/formatter"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ActiveToggleItem, DeleteItem } from "@/components/ProductActions"

export default function AdminProductPage() {
    return ( <>
        <div className="flex justify-between items-center gap-4">
            <PageHeader>Products</PageHeader>
            <Button asChild><Link href="/admin/products/new">Add Product</Link></Button>
        </div>
        <ProductsTable />
    </> )
}

async function ProductsTable() {
    const products = await db.product.findMany({ select: { id: true, name: true, price: true, isAvailable: true, _count: { select: { orders: true } } }, orderBy: { name: "asc" } })
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-0"><span className="sr-only">Available for Purchase</span></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead className="w-0"><span className="sr-only">Actions</span></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map(product => (
                    <TableRow key={product.id}>
                        <TableCell>{product.isAvailable ? <><CheckCircle2 /><span className="sr-only">Available</span></> : <><XCircle className="stroke-destructive" /><span className="sr-only">Unavailable</span></> }</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{formatCurrency(product.price)}</TableCell>
                        <TableCell>{formatNumber(product._count.orders)}</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical /><span className="sr-only">Actions</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem asChild><Link href={`/admin/products/${product.id}/edit`}>Edit</Link></DropdownMenuItem>
                                    <ActiveToggleItem id={product.id} isAvailable={product.isAvailable} />
                                    <DropdownMenuSeparator></DropdownMenuSeparator>
                                    <DeleteItem id={product.id} disabled={product._count.orders > 0} />
                                </DropdownMenuContent>
                            </DropdownMenu>    
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}