"use client"

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, Button, Link, Alert } from "@nextui-org/react"
import { addToCart } from "@/lib/cart"

export function LoginModal({ userID, productID, isUser }: { userID: string, productID: string, isUser: boolean }) {
    const loginModal = useDisclosure()
    const cartModal = useDisclosure()

    return isUser ? <>
        <div className="flex w-full">
            <Button variant="solid" color="primary" size="lg" className="w-1/2" as={Link} href={`/products/${productID}/purchase`}>Purchase Now!</Button>
            <Button variant="bordered" color="primary" size="lg" className=" w-1/2 mx-1" onPress={() => { addToCart(userID, productID); cartModal.onOpen() }}>Add to Cart</Button>
        </div>
        <Modal isOpen={cartModal.isOpen} onOpenChange={cartModal.onOpenChange}>
            <ModalContent>
                {(onClose) => (<>
                    <ModalHeader className="flex flex-col gap-1">Cart Update</ModalHeader>
                    <ModalBody><p>Successfully added Item to Cart.</p></ModalBody>
                    <ModalFooter>
                        <Button variant="bordered" onPress={onClose}>Great!</Button>
                    </ModalFooter>
                </>)}
            </ModalContent>
        </Modal>
        </> : <>
        <Button variant="solid" color="primary" size="lg" className="w-full" onPress={loginModal.onOpen}>Login to Purchase</Button>
        <Modal isOpen={loginModal.isOpen} onOpenChange={loginModal.onOpenChange}>
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