import { AdminCustomersTable } from "@/components/AdminTables"
import { PageHeader } from "@/components/PageHeader"
import db from "@/db/db"

export default async function AdminCustomersPage() {
    const users = await db.user.findMany({ select: { id: true, email: true, createdAt: true } })
    return (
        <main>
            <PageHeader>Customers</PageHeader>
            <AdminCustomersTable users={users} />
        </main>
    )
}