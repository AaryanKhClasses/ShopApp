import { Nav, NavLink } from "@/components/Nav"

export const dynmaic = "force-dynamic"

export default function AdminLayout({
    children,
    }: Readonly<{
    children: React.ReactNode
}>) {
    return <>
        <Nav>
            <NavLink href="/admin">Dashboard</NavLink>
            <NavLink href="/admin/products">Products</NavLink>
            <NavLink href="/admin/customers">Customers</NavLink>
            <NavLink href="/admin/orders">Orders</NavLink>
        </Nav>
        <div className="container my-6 px-3">{children}</div>
    </>
}