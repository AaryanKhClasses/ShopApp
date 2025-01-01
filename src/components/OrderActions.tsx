"use client"

import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { DropdownMenuItem } from "./ui/dropdown-menu"
import { toggleOrderFullfillment } from "@/app/admin/_actions/orders"

export function ActiveToggleOrder({ id, isFullfilled }: { id: string, isFullfilled: boolean }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return (
        <DropdownMenuItem disabled={isPending} onClick={() => {
            startTransition(async () => {
                await toggleOrderFullfillment(id, !isFullfilled)
                router.refresh()
            })
        }}>{isFullfilled ? <span className="text-destructive">Mark Not Fullfilled</span> : <span className="text-green-500">Mark as Fullfilled</span>}</DropdownMenuItem>
    )
}