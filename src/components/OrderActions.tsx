"use client"

import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { toggleOrderFullfillment } from "@/app/admin/_actions/orders"
import { Tooltip } from "@nextui-org/tooltip"
import { Check, CircleX } from "lucide-react"

export function ActiveOrderToggle({ id, isFullfilled }: { id: string, isFullfilled: boolean }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return (
        <span aria-disabled={isPending} onClick={() => {
            startTransition(async () => {
                await toggleOrderFullfillment(id, !isFullfilled)
                router.refresh()
            })
        }}>{isFullfilled ?
        <Tooltip content="Mark Not Fullfilled"><span className="text-lg text-destructive cursor-pointer active:opacity-50"><CircleX /></span></Tooltip> :
        <Tooltip content="Mark As Fullfilled"><span className="text-lg text-success cursor-pointer active:opacity-50"><Check /></span></Tooltip>}</span>
    )
}