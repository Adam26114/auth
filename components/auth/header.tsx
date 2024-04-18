import { cn } from "@/lib/utils";
import Image from "next/image";
import { IoLogIn } from "react-icons/io5";

interface HeaderProps {
    label: string;
}

export const Header = ({ label }: HeaderProps) => {
    return (
        <div className=" w-full flex flex-col gap-4 items-center justify-center">
            <h1 className="text-3xl font-semibold flex justify-center items-center gap-1">
                {/* <IoLogIn /> */}
                <div className=" h-10 w-10 relative">
                    <Image src="/avator.svg" fill alt="logo" />
                </div>
                Auth
            </h1>
            <p className=" text-muted-foreground text-sm">{label}</p>
        </div>
    );
};
