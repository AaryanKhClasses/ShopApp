"use client"

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal"
import { Button } from "./ui/button"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { addToCart } from "@/lib/cart"
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"

export function LoginModal({ userID, productID, isUser }: { userID: string, productID: string, isUser: boolean }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [isAlertVisible, setAlertVisible] = useState(false)

    return isUser ? <>
        <Button asChild size="lg" className="w-full"><Link href={`/products/${productID}/purchase`}>Purchase</Link></Button>
        <Button asChild size="lg" className="w-auto mx-1 cursor-pointer" onClick={() => { addToCart(userID, productID); setAlertVisible(true) }}><ShoppingCart /></Button>    
        { isAlertVisible ? <div className="flex items-center justify-center w-full top-1">
            <Alert>
                <AlertTitle>Cart Update</AlertTitle>
                <AlertDescription>The Item is Successfully Added to Your Cart</AlertDescription>
                <Button className="cursor-pointer" variant="destructive" onClick={() => setAlertVisible(false)}>Close</Button>
                <Button asChild><Link href="/me/cart">View Cart</Link></Button>
            </Alert>
        </div> : null }
        
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