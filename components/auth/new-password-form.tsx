"use client";

import * as z from "zod";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "@/schemas";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useState, useTransition } from "react";

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

import { useSearchParams } from "next/navigation";
import Loading from "@/components/loading";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { newPassword } from "@/actions/new-password";

export const NewPasswordForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [isPanding, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [eyeOpen, setEyeOpen] = useState(false);

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        },
    });
    function hundleEyeOpen() {
        setEyeOpen(!eyeOpen);
    }

    function onSubmit(values: z.infer<typeof NewPasswordSchema>) {
        setError("");
        setSuccess("");


        startTransition(() => {
            newPassword(values,token).then((values) => {
                setError(values?.error);
                setSuccess(values?.success);
            });
        });
    }

    return (
        <CardWrapper
            headerLabel="Enter a new password?"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className=" space-y-6"
                >
                    <div className=" space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                disabled={isPanding}
                                                {...field}
                                                placeholder="Please enter your password"
                                                type={
                                                    !eyeOpen
                                                        ? "password"
                                                        : "text"
                                                }
                                            />
                                            <Button
                                                className=" absolute right-3 top-[50%] translate-y-[-50%] w-6 h-6  cursor-pointer text-gray-500"
                                                variant="ghost"
                                                size="icon"
                                                type="button"
                                                onClick={hundleEyeOpen}
                                            >
                                                {eyeOpen ? (
                                                    <IoEyeSharp />
                                                ) : (
                                                    <FaEyeSlash />
                                                )}
                                            </Button>
                                        </div>
                                    </FormControl>

                                    <FormMessage className="text-[12px]" />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormError message={error} />
                    <FormSuccess message={success} />

                    <div className=" flex gap-2 justify-end">
                        <Button type="submit" className="w-full">
                            {!isPanding ? (
                                "Reset password"
                            ) : (
                                <Loading type="text" />
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </CardWrapper>
    );
};
