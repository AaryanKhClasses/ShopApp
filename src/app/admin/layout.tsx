import { AdminNavbar } from "@/components/AdminNavbar"

export const dynamic = "force-dynamic"

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <>
        <AdminNavbar appName={process.env.APP_NAME as string} />
        <div className="container my-6 px-3">{children}</div>
    </>
}