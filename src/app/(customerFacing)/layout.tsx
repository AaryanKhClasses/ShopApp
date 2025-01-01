import { Nav, NavLink } from "@/components/Nav"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getUserSession } from "@/lib/session"
import Image from "next/image"
import Link from "next/link"

export const dynmaic = "force-dynamic"

export default async function CustomerLayout({
    children,
    }: Readonly<{
    children: React.ReactNode
}>) {
    const user = await getUserSession()
    return <>
        <Nav>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/products">Products</NavLink>
            {user ?
                <DropdownMenu>
                    <DropdownMenuTrigger><Image src={user.image as string} alt={user.name as string} width="40" height="40"></Image></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem asChild><Link href="/me/orders">My Orders</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/me/cart">My Cart</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/me/settings">Account Settings</Link></DropdownMenuItem>
                        <DropdownMenuSeparator></DropdownMenuSeparator>
                        <DropdownMenuItem variant="destructive"><Link href="/api/auth/signout">Logout</Link></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                : <NavLink href="/api/auth/signin">Login</NavLink>
            }
        </Nav>
        <div className="container my-6 px-3">{children}</div>
    </>
}