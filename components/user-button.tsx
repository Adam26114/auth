"use client";

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogOut } from "lucide-react";
import { LogoutButton } from "./auth/logout-button";

export const UserButton = () => {
    const user = useCurrentUser();

    return (
        <Menubar className=" shadow-none border-none bg-transparent">
            <MenubarMenu>
                <MenubarTrigger>
                    <Avatar className=" border-white   border-muted-foreground shadow-md cursor-pointer">
                        <AvatarImage src={user?.image || ""} loading="lazy" />
                        <AvatarFallback className=" bg-black text-white">
                            <FaUser />
                        </AvatarFallback>
                    </Avatar>
                </MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>New Window</MenubarItem>

                    <MenubarItem>Share</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                        <LogoutButton className=" flex justify-between w-full items-center" >
                            Logout
                            <MenubarShortcut>
                                <LogOut className="w-4 h-4 text-black"/>
                            </MenubarShortcut>
                        </LogoutButton>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
};
