"use client"

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuToggle, NavbarMenuItem } from "@nextui-org/navbar"
import { Link } from "@nextui-org/link"
import { Image } from "@nextui-org/image"
import favicon from "@/app/favicon.ico"
import { usePathname } from 'next/navigation'

export function AdminNavbar({ appName }: { appName: string }) {
    const path = usePathname()

    return <Navbar>
        <NavbarBrand>
            <Image src={favicon.src} alt="Favicon" width="30" height="30" />
            <span className="text-2xl cursor-pointer mx-2">{appName}</span>
        </NavbarBrand>
        <NavbarContent className="flex gap-4 items-center" justify="end">
            <NavbarItem className="hidden md:block"><Link className={`text-xl hover:text-danger duration-500 ${path === '/admin' ? 'text-danger' : ''}`} href="/admin">Dashboard</Link></NavbarItem>
            <NavbarItem className="hidden md:block"><Link className={`text-xl hover:text-danger duration-500 ${path === '/admin/products' ? 'text-danger' : ''}`} href="/admin/products">Products</Link></NavbarItem>
            <NavbarItem className="hidden md:block"><Link className={`text-xl hover:text-danger duration-500 ${path === '/admin/customers' ? 'text-danger' : ''}`} href="/admin/customers">Customers</Link></NavbarItem>
            <NavbarItem className="hidden md:block"><Link className={`text-xl hover:text-danger duration-500 ${path === '/admin/orders' ? 'text-danger' : ''}`} href="/admin/orders">Orders</Link></NavbarItem>
            <NavbarMenuToggle className="md:hidden" />
        </NavbarContent>
        <NavbarMenu>
            <NavbarMenuItem><Link className={`text-xl hover:text-danger duration-500 ${path === '/admin' ? 'text-danger' : ''}`} href="/admin">Dashboard</Link></NavbarMenuItem>
            <NavbarMenuItem><Link className={`text-xl hover:text-danger duration-500 ${path === '/admin/products' ? 'text-danger' : ''}`} href="/admin/products">Products</Link></NavbarMenuItem>
            <NavbarMenuItem><Link className={`text-xl hover:text-danger duration-500 ${path === '/admin/customers' ? 'text-danger' : ''}`} href="/admin/customers">Customers</Link></NavbarMenuItem>
            <NavbarMenuItem><Link className={`text-xl hover:text-danger duration-500 ${path === '/admin/orders' ? 'text-danger' : ''}`} href="/admin/orders">Orders</Link></NavbarMenuItem>
        </NavbarMenu>
    </Navbar>
}