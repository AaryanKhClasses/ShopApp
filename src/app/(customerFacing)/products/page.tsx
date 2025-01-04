import { PageHeader } from "@/components/PageHeader"
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard"
import db from "@/db/db"
import { cache } from "@/lib/cache"
import { getUserSession } from "@/lib/session"
import { Suspense } from "react"

const getProducts = cache(() => {
    return db.product.findMany({ where: { isAvailable: true }, orderBy: { name: "asc" } })
}, ["/products", "getProducts"], { revalidate: 86400 })

export default function ProductsPage() {
    return ( <>
    <PageHeader>All Products</PageHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Suspense fallback={ <>
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
            </>}>
                <ProductsSuspense />
            </Suspense>
        </div>
    </>)
}

async function ProductsSuspense() {
    const products = await getProducts()
    const user = await getUserSession()
    
    return products.map(product => (
        <ProductCard key={product.id} {...product} isUser={user ? true : false} userID={user ? user.id : ""} />
    ))
}