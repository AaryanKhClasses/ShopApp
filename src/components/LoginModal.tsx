"use client"

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal"
import { Button } from "./ui/button"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"

export function LoginModal({ id, isUser }: { id: string, isUser: boolean }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    return isUser ? <>
        <Button asChild size="lg" className="w-full"><Link href={`/products/${id}/purchase`}>Purchase</Link></Button>
        {/* <Button asChild size="lg" className="w-auto mx-1" onClick={() => addToCart(productID)}><ShoppingCart /></Button>     */}
        </> : <>
        <Button size="lg" className="w-full" onClick={onOpen}>Login to Purchase</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (<>
                    <ModalHeader className="flex flex-col gap-1">Login</ModalHeader>
                    <ModalBody><p>To Purchase this Item, Login using a Google Account</p></ModalBody>
                    <ModalFooter>
                        <Button variant="outline" onClick={onClose}>Go Back</Button>
                        <Button asChild><Link href="/api/auth/signin">Login</Link></Button>
                    </ModalFooter>
                </>)}
            </ModalContent>
        </Modal>
    </>
}