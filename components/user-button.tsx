"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogOut } from "lucide-react";
import { LogoutButton } from "./auth/logout-button";

export const UserButton = () => {
    const user = useCurrentUser();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className=" border-white   border-muted-foreground shadow-md cursor-pointer">
                    <AvatarImage src={user?.image || ""} loading="lazy" />
                    <AvatarFallback className=" bg-black text-white">
                        <FaUser />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    New Tab <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>New Window</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogoutButton className=" flex justify-between w-full items-center">
                        Logout
                        <DropdownMenuShortcut>
                            <LogOut className="w-4 h-4 text-black" />
                        </DropdownMenuShortcut>
                    </LogoutButton>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
