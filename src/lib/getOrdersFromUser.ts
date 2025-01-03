"use server"

import db from "@/db/db"

export async function getOrdersFromUser(userID: string) {
    const orders = await db.order.findMany({ where: { userID: userID } })
    return orders
}