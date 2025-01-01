import { PageHeader } from "@/components/PageHeader"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import db from "@/db/db"
import { formatCurrency } from "@/lib/formatter"

export default async function AdminCustomersPage() {  
    return (
        <main>
            <PageHeader>Customers</PageHeader>
            <CustomersTable />
        </main>
    )
}

async function CustomersTable() {
    const users = await db.user.findMany({ select: { id: true, email: true, createdAt: true } })
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Customer Email</TableHead>
                    <TableHead>Purchased Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map(async user => (
                    <TableRow key={user.id}>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{formatCurrency((await db.order.aggregate({ where: { userID: user.id }, _sum: { price: true } }))._sum.price as number)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}