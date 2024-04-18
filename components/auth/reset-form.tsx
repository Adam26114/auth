"use client";

import * as z from "zod";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetSchema } from "@/schemas";
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
import { reset } from "@/actions/reset";

export const ResetForm = () => {
    const searchParams = useSearchParams();
    const urlError =
        searchParams.get("error") === "OAuthAccountNotLinked"
            ? "Email already in use with different provider!"
            : "";

    const [isPanding, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    
    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        },
    });

    function onSubmit(data: z.infer<typeof ResetSchema>) {
        setError("");
        setSuccess("");
        startTransition(() => {
            reset(data).then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            });
        });
    }

    return (
        <CardWrapper
            headerLabel="Forgot your password?"
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
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isPanding}
                                            {...field}
                                            placeholder="Please enter your email address"
                                            type="email"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[12px]" />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />

                    <div className=" flex gap-2 justify-end">
                        <Button type="submit" className="w-full">
                            {!isPanding ? (
                                "Sent reset email"
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
