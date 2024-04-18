"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components//ui/card";
import { Header } from "@/components/auth/header";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { VerificationSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useTransition } from "react";
import { toast } from "@/components/ui/use-toast";
import Loading from "@/components/loading";
import { BackButton } from "./back-button";

export const VerifyForm = () => {
    const [isPanding, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof VerificationSchema>>({
        resolver: zodResolver(VerificationSchema),
        defaultValues: {
            token: "",
        },
    });

    function onSubmit(data: z.infer<typeof VerificationSchema>) {
        setError("");
        setSuccess("");

        startTransition(() => {
            // login(data).then((data) => {
            //     setError(data?.error);
            //     setSuccess(data?.success);
            // });
            toast({
                title: "You submitted the following values:",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">
                            {JSON.stringify(data, null, 2)}
                        </code>
                    </pre>
                ),
            });
        });
    }

    const resend = () => {};
    return (
        <Card className="shadow-md px-4 py-2">
            <CardHeader>
                <Header label="Forgot your password ?" />
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-start">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-2"
                    >
                        <FormField
                            control={form.control}
                            name="token"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Enter Verification Code
                                    </FormLabel>
                                    <FormControl>
                                        <InputOTP maxLength={6} {...field}>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                            </InputOTPGroup>
                                            <InputOTPSeparator />
                                            <InputOTPGroup>
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormMessage className=" text-[12px]" />

                                    <FormDescription className="text-[10px] ">
                                        <p className="text-[10px] text-muted-foreground">
                                            Didn&apos;t get a code?
                                            <Button
                                                variant="link"
                                                className="text-[10px] p-0 mx-1"
                                                onClick={resend}
                                            >
                                                Click to resend
                                            </Button>
                                        </p>
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                        <div>
                            <Button type="submit" className="w-full">
                                {!isPanding ? (
                                    "Confirm"
                                ) : (
                                    <Loading type="text" />
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
                <div className="mt-2 mx-auto">
                    <BackButton label="Back to login" href="/auth/login" />
                </div>
            </CardContent>
        </Card>
    );
};
