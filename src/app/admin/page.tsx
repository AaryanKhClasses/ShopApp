import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import db from "@/db/db"
import { formatCurrency, formatNumber } from "@/lib/formatter"

export default async function AdminDashboard() {
    const [salesData, customerData, productData] = await Promise.all([getSalesData(), getCustomerData(), getProductData()])
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DashboardCard title="Sales" subtitle={`${formatNumber(salesData.number)} Orders`} body={`${formatCurrency(salesData.amount)}`} />
            <DashboardCard title="Customers" subtitle={`${formatCurrency(customerData.average)} Average Value`} body={`${formatNumber(customerData.userCount)}`} />
            <DashboardCard title="Products" subtitle={`${formatNumber(productData.inactive)} Inactive Products`} body={`${formatNumber(productData.active)} Active Products`} />
        </div>
    )
}

async function getSalesData() {
    const data = await db.order.aggregate({
        _sum: { price: true },
        _count: true
    })

    return {
        amount: data._sum.price || 0,
        number: data._count
    }
}

async function getCustomerData() {
    const [userCount, ordersData] = await Promise.all([
        db.user.count(),
        db.order.aggregate({
            _sum: { price: true }
        })
    ])

    return { 
        userCount,
        average: userCount === 0 ? 0 : (ordersData._sum.price || 0) / userCount
    }
}

async function getProductData() {
    const [active, inactive] = await Promise.all([
        db.product.count({ where: { isAvailable: true } }),
        db.product.count({ where: { isAvailable: false } })
    ])

    return { active, inactive }
}

type DashboardCardProps = {
    title: string
    subtitle: string
    body: string
}

function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{subtitle}</CardDescription>
            </CardHeader>
            <CardContent><p>{body}</p></CardContent>
        </Card>
    )
}