"use server"

import db from "@/db/db"

export async function addToCart(userID: string, productID: string) {
    await db.user.update({ where: { id: userID }, data: { id: userID, cart: { create: { productID } } } })
}

export async function removeFromCart(cartItemID: string) {
    await db.cartItem.delete({ where: { id: cartItemID } })
}