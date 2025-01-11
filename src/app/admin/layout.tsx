import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar"
import { Link } from "@nextui-org/link"
import { Image } from "@nextui-org/image"
import favicon from "@/app/favicon.ico"

export const dynamic = "force-dynamic"

export default async function AdminLayout({
    children,
    }: Readonly<{
    children: React.ReactNode
}>) {
    return <>
        <Navbar>
            <NavbarBrand>
            <Image src={favicon.src} width="30" height="30" />
            <span className="text-2xl cursor-pointer mx-2">{process.env.APP_NAME}</span>
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