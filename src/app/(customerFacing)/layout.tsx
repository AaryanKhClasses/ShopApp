import { getUserSession } from "@/lib/session"
import { Link } from "@nextui-org/link"
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar"
import { UserDropdown } from "@/components/UserDropdown"

export const dynamic = "force-dynamic"

export default async function CustomerLayout({
    children,
    }: Readonly<{
    children: React.ReactNode
}>) {
    const user = await getUserSession()
    return <>
        <Navbar>
            <NavbarBrand>
                <span className="text-2xl cursor-pointer">{process.env.APP_NAME}</span>
            </NavbarBrand>
            <NavbarContent className="flex gap-4 items-center" justify="end">
                <NavbarItem><Link className="text-xl font-bold hover:text-destructive duration-500" href="/">Home</Link></NavbarItem>
                <NavbarItem><Link className="text-xl font-bold hover:text-destructive duration-500" href="/products">Products</Link></NavbarItem>
                <NavbarItem><UserDropdown imagePath={user ? user.image as string : ""} /></NavbarItem>
            </NavbarContent>
        </Navbar>
        <div className="container my-6 px-3">{children}</div>
    </>
}