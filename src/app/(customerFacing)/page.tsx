import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard"
import { Button } from "@nextui-org/button"
import { Link } from "@nextui-org/link"
import db from "@/db/db"
import { cache } from "@/lib/cache"
import { Product } from "@prisma/client"
import { Suspense } from "react"
import { getUserSession } from "@/lib/session"

const getMostPopularProducts = cache(() => {
    return db.product.findMany({ where: { isAvailable: true }, orderBy: { orders: { _count: "desc" } }, take: 6 })
}, ["/", "getMostPopularProducts"], { revalidate: 86400 })

const getNewestProducts = cache(() => {
    return db.product.findMany({ where: { isAvailable: true }, orderBy: { createdAt: "desc" }, take: 6 })
}, ["/", "getMostPopularProducts"], { revalidate: 86400 })

export default async function HomePage() {
    return (
      <main className="space-y-12">
        <ProductGridSection title="Most Popular Products" fetcher={getMostPopularProducts} />
        <ProductGridSection title="Newest Products" fetcher={getNewestProducts} />
      </main>
    )
}

type ProductGridSectionProps = {
    fetcher: () => Promise<Product[]>
    title: string
}

function ProductGridSection({ fetcher, title }: ProductGridSectionProps ) {
    return <div className="space-y-4">
        <div className="flex gap-4">
            <h2 className="text-3xl font-bold">{title}</h2>
            <Button color="primary" as={Link} href="/products" variant="flat">View All</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Suspense fallback={ <>
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
            </>}>
                <ProductSuspense fetcher={fetcher} />
            </Suspense>
        </div>
    </div>
}

async function ProductSuspense({ fetcher }: { fetcher: () => Promise<Product[]> }) {
    const user = await getUserSession()
    return (await fetcher()).map(product => (
        <ProductCard key={product.id} {...product} isUser={user ? true : false} userID={user ? user.id : ""} />
    ))
}