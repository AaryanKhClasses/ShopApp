import { LoginModal } from "@/components/LoginModal"
import db from "@/db/db"
import { formatCurrency } from "@/lib/formatter"
import { getUserSession } from "@/lib/session"
import { Image } from "@nextui-org/image"
import { notFound } from "next/navigation"

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const product = await db.product.findUnique({ where: { id } })
    if(product == null) return notFound()

    const user = await getUserSession()
    let isUser = true
    if(!user) isUser = false
    
    return (<>
        <div className="flex w-full">
            <div className="flex flex-col w-2/5">
                <div className="space-y-2">
                    <div className="flex justify-center items-center w-full h-[400px] bg-default-100 p-6 rounded-lg">
                        <Image src={product.imagePath} alt={product.name} width="400" height="400" className="object-contain w-full h-full"></Image>
                    </div>
                </div>
                <div className="space-y-2 my-3">
                    <div className="flex justify-end items-center">
                        <div className="text-4xl font-bold text-success">Price: {formatCurrency(product.price)}</div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-3/5 ml-5">
                <div className="space-y-2">
                    <div className="text-3xl font-bold">{product.name}</div>
                </div>
                <div className="space-y-2">
                    <div className="text-lg text-default-500 my-5">{product.description}</div>
                </div>
            </div>
        </div>
        <div className="flex w-full fixed bg-default bottom-0 py-2 left-0 px-2 items-center justify-between">
            <div className="flex flex-col w-full">
                <span className="font-bold text-xl line-clamp-1">{product.name }</span>
                <span className="text-l">{formatCurrency(product.price)}</span>
            </div>
            <div className="w-full"><LoginModal isUser={isUser} userID={isUser ? user.id : ""} productID={product.id} /></div>
        </div>
    </>)
}