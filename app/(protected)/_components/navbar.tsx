"use client";

import { UserButton } from "@/components/user-button";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
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
    return (
        <nav className=" bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
            <div className="flex gap-x-5">
                {routes.map((route) => (
                    <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-primary relative",
                            route.active
                                ? "text-black dark:text-white"
                                : "text-muted-foreground"
                        )}
                    >
                        <div className={cn(" absolute top-[-0%] left-[50%] translate-x-[-50%] opacity-0 hidden text-indigo-600 transition", route.active && "block opacity-1 top-[-60%]")}>
                            •
                        </div>
                        {route.label}
                    </Link>
                ))}
            </div>
            <UserButton/>
        </nav>
    );
};

export default Navbar;
