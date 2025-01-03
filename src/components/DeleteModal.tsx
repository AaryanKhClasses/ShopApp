"use client"

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal"
import { Button } from "@nextui-org/button"
import { deleteAccount } from "@/lib/deleteAccount"

export function DeleteModal({ user }: { user: any }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    return (
        <div>
            <Button color="danger" className="w-full" onPress={onOpen}>Delete Account</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (<>
                        <ModalHeader className="flex flex-col gap-1">Account Deletion</ModalHeader>
                        <ModalBody><p> Are you sure you want to delete your account?</p><p className="text-destructive">NOTE: This action is irreversible.</p></ModalBody>
                        <ModalFooter>
                            <Button onPress={onClose}>Go Back</Button>
                            <Button color="danger" onPress={() => deleteAccount(user)}>Delete Account</Button>
                        </ModalFooter>
                    </>)}
                </ModalContent>
            </Modal>
        </div>
    )
}