"use server"

import db from "@/db/db"
import { revalidatePath } from "next/cache"

export async function toggleOrderFullfillment(id: string, isFullfilled: boolean) {
    await db.order.update({ where: { id: id }, data: { fullfilled: isFullfilled } })

    revalidatePath("/")
    revalidatePath("/me/orders")
    revalidatePath("/admin/orders")
}