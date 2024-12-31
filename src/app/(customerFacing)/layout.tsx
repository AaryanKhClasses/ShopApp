import { Nav, NavLink } from "@/components/Nav"
import { getUserSession } from "@/lib/session"
import Image from "next/image"

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
            {user ? <NavLink href="/me"><Image src={user.image as string} alt={user.name as string} width="40" height="40"></Image></NavLink> : <NavLink href="/api/auth/signin">Login</NavLink>}
        </Nav>
        <div className="container my-6 px-3">{children}</div>
    </>
}