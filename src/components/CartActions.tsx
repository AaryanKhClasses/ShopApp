"use client"

import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { removeFromCart } from "@/lib/cart"
import { Tooltip } from "@nextui-org/react"
import { XCircle } from "lucide-react"

export function DeleteCartItem({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return (
        <span aria-disabled={isPending} onClick={() => {
            startTransition(async () => { 
                await removeFromCart(id)
                router.refresh()
            })
        }}><Tooltip content="Remove 1 From Cart"><span className="text-lg text-destructive cursor-pointer"><XCircle /></span></Tooltip></span>
    )
}