"use client"

import Link from "next/link"
import { ComponentProps, ReactNode } from "react"

export function Nav({ children }: { children: ReactNode }) {
    return (
        <nav className="p-5 bg-white shadow flex items-center justify-between">
            <div className="flex justify-between items-center">
                <span className="text-2xl cursor-pointer"><Link href="/">Ecommerce Platform</Link></span>
            </div>
            <ul className="flex items-center z-auto static w-auto py-0 pl-0 opacity-100">{children}</ul>
        </nav>
    )
  }
  
export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
    return <li className="text-xl hover:text-red-500 duration-500 mx-4 my-0">
        <Link{...props} className="text-xl" />
    </li>
}