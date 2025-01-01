import { formatCurrency } from "@/lib/formatter"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import Image from "next/image"
import { LoginModal } from "./LoginModal"
import { getUserSession } from "@/lib/session"
import Link from "next/link"

type ProductCardProps = {
    id: string
    name: string
    price: number
    description: string
    imagePath: string
}

export async function ProductCard({ id, name, price, description, imagePath }: ProductCardProps) {
    const userSession = await getUserSession()
    let isUser = false
    if(userSession) isUser = true
    return (
        <Card className="flex overflow-hidden flex-col">
            <div className="relative w-full h-auto aspect-video"><Image src={imagePath} fill alt={name}></Image></div>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{formatCurrency(price)}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow"><p className="line-clamp-4">{description}</p></CardContent>
            <CardFooter><LoginModal id={id} isUser={isUser} /></CardFooter>
        </Card>
    )
}

export function ProductCardSkeleton() {
    return (
        <Card className="overflow-hidden flex flex-col animate-pulse">
            <div className="w-full aspect-video bg-gray-300" />
            <CardHeader>
                <CardTitle><div className="w-3/4 h-6 rounded-full bg-gray-300" /></CardTitle>
                <CardDescription><div className="w-1/2 h-4 rounded-full bg-gray-300" /></CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="w-full h-4 rounded-full bg-gray-300" />
                <div className="w-full h-4 rounded-full bg-gray-300" />
                <div className="w-3/4 h-4 rounded-full bg-gray-300" />
            </CardContent>
            <CardFooter><Button className="w-full" disabled size="lg"></Button></CardFooter>
        </Card>
    )
  }