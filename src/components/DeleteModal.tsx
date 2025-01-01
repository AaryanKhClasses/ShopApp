"use client"

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal"
import { Button } from "./ui/button"
import { deleteAccount } from "@/lib/deleteAccount"

export function DeleteModal({ user }: { user: any }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    return (
        <div>
            <Button variant="destructive" className="w-full" onClick={onOpen}>Delete Account</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (<>
                        <ModalHeader className="flex flex-col gap-1">Account Deletion</ModalHeader>
                        <ModalBody><p> Are you sure you want to delete your account?</p><p className="text-destructive">NOTE: This action is irreversible.</p></ModalBody>
                        <ModalFooter>
                            <Button onClick={onClose}>Go Back</Button>
                            <Button variant="destructive" onClick={() => deleteAccount(user)}>Delete Account</Button>
                        </ModalFooter>
                    </>)}
                </ModalContent>
            </Modal>
        </div>
    )
}