"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/socal";
import { BackButton } from "@/components/auth/back-button";
// import Link from "next/link";
import Links from "@/components/Links";
import { cn } from "@/utils/cn";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showShocial?: boolean;
    showPolicy?: boolean;
    showTwoFactor?: boolean;
}

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showShocial,
    showPolicy,
    showTwoFactor,
}: CardWrapperProps) => {
    return (
        <Card className={cn("w-[450px] shadow-md",showTwoFactor && "w-auto")}>
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>

            <CardContent>{children}</CardContent>

            {showShocial && !showTwoFactor && (
                <CardFooter className=" flex flex-col gap-5">
                    <div className=" relative w-full flex items-center gap-2 mpy-10 uppercase text-muted-foreground text-sm">
                        <hr className="w-1/2 border-gray-300" />
                        <p>OR</p>
                        <hr className="w-1/2 border-gray-300" />
                    </div>
                    <Social />
                </CardFooter>
            )}

        
             <CardFooter className=" flex flex-col">
                    <BackButton label={backButtonLabel} href={backButtonHref} />
                    {!showTwoFactor && showPolicy && (
                        <p className="text-[10px] text-muted-foreground">
                            By signing up, you agree to our
                            <Links href="/term" label="terms" />,
                            <Links
                                href="/acceptableuse"
                                label="acceptable use"
                            />
                            , and
                            <Links href="/policy" label="privacy policy" />.
                        </p>
                    )}
                </CardFooter>
        </Card>
    );
};
