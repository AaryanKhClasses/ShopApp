"use client"

import { useTransition } from "react"
import { deleteProduct, toggleProductAvailability } from "@/app/admin/_actions/products"
import { useRouter } from "next/navigation"
import { Tooltip } from "@nextui-org/react"
import { AlignJustify, CircleX } from "lucide-react"

export function ActiveProductToggle({ id, isAvailable }: { id: string, isAvailable: boolean }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return (
        <span aria-disabled={isPending} onClick={() => {
            startTransition(async () => {
                await toggleProductAvailability(id, !isAvailable)
                router.refresh()
            })
        }}>{isAvailable ?
            <Tooltip content="Delist Product"><span className="text-lg text-danger cursor-pointer active:opacity-50"><AlignJustify /></span></Tooltip>
            : <Tooltip content="Relist Product"><span className="text-lg text-default-400 cursor-pointer active:opacity-50"><AlignJustify /></span></Tooltip> }
        </span>
    )
}

export function DeleteProduct({ id, disabled }: { id: string, disabled: boolean }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return (
        <span aria-disabled={disabled || isPending} onClick={() => {
            disabled || isPending ? null : startTransition(async () => {
                await deleteProduct(id)
                router.refresh()
            })
        }}>{disabled ?
            <Tooltip content="Cannot Delete Product"><span className="text-lg text-default-400 cursor-not-allowed active:opacity-50"><CircleX /></span></Tooltip>
            : <Tooltip content="Delete Product"><span className="text-lg text-danger cursor-pointer active:opacity-50"><CircleX /></span></Tooltip>
        }
        </span>
    )
}