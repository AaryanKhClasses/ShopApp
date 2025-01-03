"use client"

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, Button, Link, Alert } from "@nextui-org/react"
import { ShoppingCart } from "lucide-react"
import { addToCart } from "@/lib/cart"
import { useState } from "react"

export function LoginModal({ userID, productID, isUser }: { userID: string, productID: string, isUser: boolean }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [isAlertVisible, setAlertVisible] = useState(false)

    return isUser ? <>
        <div className="flex w-full">
            <Button size="lg" className="flex-grow" as={Link} href={`/products/${productID}/purchase`}>Purchase</Button>
            <Button size="lg" className="w-auto mx-1" onPress={() => { addToCart(userID, productID); setAlertVisible(true) }}><ShoppingCart /></Button>
        </div>
        { isAlertVisible ?
            <div className="flex items-center justify-center w-full flex-col gap-4">   
                <Alert color="success" description="Item Successfully Added To Cart" title="Cart Update" variant="faded" onClose={() => setAlertVisible(false)} />
            </div>
        : null }
        </> : <>
        <Button size="lg" className="w-full" onPress={onOpen}>Login to Purchase</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (<>
                    <ModalHeader className="flex flex-col gap-1">Login</ModalHeader>
                    <ModalBody><p>To Purchase this Item, Login using a Google Account</p></ModalBody>
                    <ModalFooter>
                        <Button variant="bordered" onPress={onClose}>Go Back</Button>
                        <Button as={Link} href="/api/auth/signin">Login</Button>
                    </ModalFooter>
                </>)}
            </ModalContent>
        </Modal>
    </>
}