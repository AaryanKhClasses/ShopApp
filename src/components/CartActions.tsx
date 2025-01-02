"use client"

import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { DropdownMenuItem } from "./ui/dropdown-menu"
import { removeFromCart } from "@/lib/cart"

export function DeleteCartItem({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return (
        <DropdownMenuItem variant="destructive" disabled={isPending} onClick={() => {
            startTransition(async () => { 
                await removeFromCart(id)
                router.refresh()
            })
        }}>Remove 1 From Cart</DropdownMenuItem>
    )
}