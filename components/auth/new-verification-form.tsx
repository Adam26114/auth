"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import Loading from "@/components/loading";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { redirect } from "next/navigation";
export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if (success || error) return;

        if (!token) return setError("Missing token");

        newVerification(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
            })
            .catch(() => {
                setError("Something went wrong!");
            });
    }, [token, success, error]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <CardWrapper
            headerLabel="Confirming your verification"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <div className=" flex items-center w-full justify-center">
                {!success && !error && <Loading type="bounce" />}
                <FormSuccess message={success} />
                <FormError message={error} />
            </div>
        </CardWrapper>
    );
};
