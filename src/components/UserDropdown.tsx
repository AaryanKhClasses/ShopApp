"use client"

import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/dropdown"
import { Avatar } from "@nextui-org/avatar"
import { Link } from "@nextui-org/link"

export function UserDropdown({ imagePath }: { imagePath: string }) {
    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger><Avatar isBordered radius="full" src={imagePath} /></DropdownTrigger>
            <DropdownMenu variant="flat">
                {imagePath === "" ? <DropdownItem key="login"><Link href="/api/auth/signin">Login</Link></DropdownItem>
                : <>
                <DropdownSection showDivider>
                    <DropdownItem key="orders"><Link href="/me/orders">My Orders</Link></DropdownItem>
                    <DropdownItem key="cart"><Link href="/me/cart">My Cart</Link></DropdownItem>
                    <DropdownItem key="settings"><Link href="/me/settings">Account Settings</Link></DropdownItem>
                </DropdownSection>
                <DropdownItem color="danger" key="logout"><Link href="/api/auth/signout" className="text-danger">Logout</Link></DropdownItem>
                </> }
            </DropdownMenu>
        </Dropdown>
    )
}