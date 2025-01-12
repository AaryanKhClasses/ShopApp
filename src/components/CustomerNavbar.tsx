"use client"

import { Link } from "@nextui-org/link"
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuToggle, NavbarMenuItem } from "@nextui-org/navbar"
import { UserDropdown } from "@/components/UserDropdown"
import { Image } from "@nextui-org/image"
import favicon from "@/app/favicon.ico"
import { Divider } from "@nextui-org/divider"
import { usePathname } from 'next/navigation'
import { User } from "next-auth"

export function CustomerNavbar({ user, appName }: { user: User, appName: string }) {
    const path = usePathname()

    return <Navbar>
        <NavbarBrand>
            <Image src={favicon.src} alt="Favicon" width="30" height="30" />
            <span className="text-2xl cursor-pointer mx-2">{appName}</span>
        </NavbarBrand>
        <NavbarContent className="flex gap-4 items-center" justify="end">
            <NavbarItem className="hidden md:block"><Link className={`text-xl hover:text-danger duration-500 ${path === '/' ? 'text-danger' : ''}`} href="/">Home</Link></NavbarItem>
            <NavbarItem className="hidden md:block"><Link className={`text-xl hover:text-danger duration-500 ${path === '/products' ? 'text-danger' : ''}`} href="/products">Products</Link></NavbarItem>
            <NavbarItem className="hidden md:block"><UserDropdown imagePath={user ? user.image as string : ""} /></NavbarItem>
            <NavbarMenuToggle className="md:hidden" />
        </NavbarContent>
        <NavbarMenu>
            <NavbarMenuItem><Link className={`text-xl hover:text-danger duration-500 ${path === '/' ? 'text-danger' : ''}`} href="/">Home</Link></NavbarMenuItem>
            <NavbarMenuItem><Link className={`text-xl hover:text-danger duration-500 ${path === '/products' ? 'text-danger' : ''}`} href="/products">Products</Link></NavbarMenuItem>
            <Divider />
            <NavbarMenuItem><Link className={`text-xl hover:text-default-400 duration-500 ${path === '/me/orders' ? 'text-default-400' : ''}`} href="/me/orders">My Orders</Link></NavbarMenuItem>
            <NavbarMenuItem><Link className={`text-xl hover:text-default-400 duration-500 ${path === '/me/cart' ? 'text-default-400' : ''}`} href="/me/cart">My Cart</Link></NavbarMenuItem>
            <NavbarMenuItem><Link className={`text-xl hover:text-default-400 duration-500 ${path === '/me/settings' ? 'text-default-400' : ''}`} href="/me/settings">Account Settings</Link></NavbarMenuItem>
            <Divider />
            <NavbarMenuItem><Link href="/api/auth/signout" className="text-xl text-danger">Logout</Link></NavbarMenuItem>
        </NavbarMenu>
    </Navbar>
}