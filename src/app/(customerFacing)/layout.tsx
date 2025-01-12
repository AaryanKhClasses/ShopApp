import { getUserSession } from "@/lib/session"
import { CustomerNavbar } from "@/components/CustomerNavbar"

export const dynamic = "force-dynamic"

export default async function CustomerLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const user = await getUserSession()
    return <>
        <CustomerNavbar user={user} appName={process.env.APP_NAME as string} />
        <div className="container my-6 px-3">{children}</div>
    </>
}