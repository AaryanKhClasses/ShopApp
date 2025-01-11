"use client"

import { formatCurrency } from "@/lib/formatter"
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card"
import { Image } from "@nextui-org/image"
import { Skeleton } from "@nextui-org/skeleton"
import { Button } from "@nextui-org/button"
import { Link } from "@nextui-org/link"

type ProductCardProps = {
    id: string
    name: string
    price: number
    description: string
    imagePath: string
    isUser: boolean
    userID: string
}

export function ProductCard({ id, name, price, description, imagePath, isUser, userID }: ProductCardProps) {
    return (
        <Card className="py-4" radius="lg">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-l">{name}</h4>
                <p className="text-tiny font-bold">{formatCurrency(price)}</p>
                <small className="text-default-500 line-clamp-3">{description}</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Image src={imagePath} alt={name} className="w-full h-auto aspect-video" />
            </CardBody>
            <CardFooter>
                <Button variant="solid" color="primary" size="lg" className="w-full" as={Link} href={`/products/${id}`}>View Product</Button>
            </CardFooter>
        </Card>
    )
}

export function ProductCardSkeleton() {
    return (
        <Card className="space-y-5 p-4" radius="lg">
            <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg"><div className="h-3 w-3/5 rounded-lg bg-default-200" /></Skeleton>
                <Skeleton className="w-4/5 rounded-lg"><div className="h-3 w-4/5 rounded-lg bg-default-200" /></Skeleton>
                <Skeleton className="w-2/5 rounded-lg"><div className="h-3 w-2/5 rounded-lg bg-default-300" /></Skeleton>
                <Skeleton className="rounded-lg"><div className="h-24 rounded-lg bg-default-300" /></Skeleton>
            </div>
        </Card>
    )
}