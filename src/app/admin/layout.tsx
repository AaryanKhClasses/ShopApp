import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar"
import { Link } from "@nextui-org/link"

export const dynamic = "force-dynamic"

export default async function CustomerLayout({
    children,
    }: Readonly<{
    children: React.ReactNode
}>) {
    return <>
        <Navbar>
            <NavbarBrand>
                <span className="text-2xl cursor-pointer">{process.env.APP_NAME}</span>
            </NavbarBrand>
            <NavbarContent className="flex gap-4 items-center" justify="end">
                <NavbarItem><Link className="text-xl hover:text-red-500 duration-500" href="/admin">Dashboard</Link></NavbarItem>
                <NavbarItem><Link className="text-xl hover:text-red-500 duration-500" href="/admin/products">Products</Link></NavbarItem>
                <NavbarItem><Link className="text-xl hover:text-red-500 duration-500" href="/admin/customers">Customers</Link></NavbarItem>
                <NavbarItem><Link className="text-xl hover:text-red-500 duration-500" href="/admin/orders">Orders</Link></NavbarItem>
            </NavbarContent>
        </Navbar>
        <div className="container my-6 px-3">{children}</div>
    </>
}