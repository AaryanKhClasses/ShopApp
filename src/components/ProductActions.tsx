"use client"

import { useTransition } from "react"
import { DropdownMenuItem } from "./ui/dropdown-menu"
import { deleteProduct, toggleProductAvailability } from "@/app/admin/_actions/products"
import { useRouter } from "next/navigation"

export function ActiveToggleItem({ id, isAvailable }: { id: string, isAvailable: boolean }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return (
        <DropdownMenuItem disabled={isPending} onClick={() => {
            startTransition(async () => {
                await toggleProductAvailability(id, !isAvailable)
                router.refresh()
            })
        }}>{isAvailable ? "Delist Product" : "Relist Product"}</DropdownMenuItem>
    )
}

export function DeleteItem({ id, disabled }: { id: string, disabled: boolean }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return (
        <DropdownMenuItem variant="destructive" disabled={disabled || isPending} onClick={() => {
            startTransition(async () => { 
                await deleteProduct(id)
                router.refresh()
            })
        }}>Delete Product</DropdownMenuItem>
    )
}