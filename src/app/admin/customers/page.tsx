import { AdminCustomersTable } from "@/components/AdminTables"
import { PageHeader } from "@/components/PageHeader"
import db from "@/db/db"

export default async function AdminCustomersPage() {
    const users = await fetchUsers()
    return (
        <main>
            <PageHeader>Customers</PageHeader>
            <AdminCustomersTable users={users} />
        </main>
    )
}

async function fetchUsers() {
    const users = await db.user.findMany({ select: { id: true, email: true, createdAt: true } })

    const getUsers = await Promise.all(
        users.map(async user => {
            const orders = await db.order.findMany({ where: { userID: user.id } })
            const purchasedAmount = Number(orders.reduce((acc, order) => acc + order.price, 0))
            return { ...user, purchasedAmount }
        })
    )

    return getUsers
}