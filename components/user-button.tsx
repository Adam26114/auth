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
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

export const UserButton = () => {
   const user = useCurrentUser();
   const router = useRouter();
   const pathname = usePathname();

   const routes = [
      {
         href: `/server`,
         label: "Server",
         active: pathname === `/server`,
      },
      {
         href: `/client`,
         label: "Client",
         active: pathname === `/client`,
      },
      {
         href: `/admin`,
         label: "Admin",
         active: pathname === `/admin`,
      },
      {
         href: `/settings`,
         label: "Settings",
         active: pathname === `/settings`,
      },
   ];

   const handleClick = (routes: string) => {
      router.push(routes);
   };

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
               {routes.map((item, idx) => (
                  <MenubarItem
                     onClick={() => handleClick(item.href)}
                     key={idx}
                     className={cn("", item.active && "bg-secondary")}
                  >
                     {item.label}
                  </MenubarItem>
               ))}

               <MenubarSeparator />
               <MenubarItem>
                  <LogoutButton className=" flex justify-between w-full items-center">
                     Logout
                     <MenubarShortcut>
                        <LogOut className="w-4 h-4 text-black" />
                     </MenubarShortcut>
                  </LogoutButton>
               </MenubarItem>
            </MenubarContent>
         </MenubarMenu>
      </Menubar>
   );
};
