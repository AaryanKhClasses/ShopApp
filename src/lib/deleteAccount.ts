"use server"

import db from "@/db/db"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function deleteAccount(user: any) {
    await db.user.delete({ where: { id: user.id } });
    (await cookies()).delete("next-auth.session-token")
    redirect("/")
}