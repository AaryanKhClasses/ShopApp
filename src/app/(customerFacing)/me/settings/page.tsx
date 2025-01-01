import { DeleteModal } from "@/components/DeleteModal"
import { PageHeader } from "@/components/PageHeader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import db from "@/db/db"
import { getUserSession } from "@/lib/session"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function MySettingsPage() {
    const userSession = await getUserSession()
    if(!userSession) return notFound()

    const user = await db.user.findUnique({ where: { id: userSession.id } })
    if(!user) return notFound()

    return (
        <main>
            <PageHeader>Account Settings</PageHeader>
            <h1 className="text-2xl">Personal Information:</h1>
            <div className="flex my-2">
                <Image src={userSession.image as string} alt={userSession.name as string} height="300" width="300" />
                <div className="mx-5 flex-1">
                    <h1 className="text-xl"></h1>User ID: <Input type="text" disabled value={userSession.id as string} className="w-full my-3" />
                    <h1 className="text-xl"></h1>User Name: <Input type="text" disabled value={userSession.name as string} className="w-full my-3" />
                    <h1 className="text-xl"></h1>User Email: <Input type="email" disabled value={userSession.email as string} className="w-full my-3" />
                </div>
            </div>
            <hr className="my-3" />
            <h1 className="text-2xl my-5">Purchase Information:</h1>
            <Button asChild className="w-full"><Link href="/me/orders">My Orders</Link></Button>
            <hr className="my-3" />
            <h1 className="text-2xl my-5">Dangerous Settings:</h1>
            <DeleteModal user={user} />
        </main>
    )
}