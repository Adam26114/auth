"use client";

import * as z from "zod";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import {
   InputOTP,
   InputOTPGroup,
   InputOTPSeparator,
   InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

import { useState, useTransition } from "react";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";
import { useSearchParams } from "next/navigation";
import Loading from "@/components/loading";

export const LoginForm = () => {
   const searchParams = useSearchParams();
   const callbackUrl = searchParams.get("callbackUrl");
   const urlError =
      searchParams.get("error") === "OAuthAccountNotLinked"
         ? "Email already in use with different provider!"
         : "";

   const [showTwoFactor, setShowTwoFactor] = useState(false);

   const [isPanding, startTransition] = useTransition();
   const [error, setError] = useState<string | undefined>("");
   const [success, setSuccess] = useState<string | undefined>("");
   const [eyeOpen, setEyeOpen] = useState(false);

   function hundleEyeOpen() {
      setEyeOpen(!eyeOpen);
   }
   const form = useForm<z.infer<typeof LoginSchema>>({
      resolver: zodResolver(LoginSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   });

   function onSubmit(data: z.infer<typeof LoginSchema>) {
      setError("");
      setSuccess("");

      startTransition(() => {
         login(data, callbackUrl || undefined)
            .then((data) => {
               if (data?.error) {
                  form.reset();
                  setError(data.error);
               }

               if (data?.success) {
                  form.reset();
                  setSuccess(data.success);
               }

               if (data?.twoFactor) {
                  setShowTwoFactor(true);
               }
            })
            .catch(() => setError("Something went wrong"));
      });
   }

   function hundleCancle() {
      form.reset();
      setError("");
      setSuccess("");
   }

   return (
      <CardWrapper
         headerLabel="Welcome back"
         backButtonLabel="Don't have an account?"
         backButtonHref="/auth/register"
         showShocial
         showPolicy
         showTwoFactor={showTwoFactor}
      >
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
               <div className=" space-y-4">
                  {showTwoFactor && (
                     <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Two Factor Code</FormLabel>
                              <FormControl>
                                 <InputOTP
                                    maxLength={6}
                                    {...field}
                                    disabled={isPanding}
                                 >
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

                              {/* <FormDescription className="text-[10px] ">
                                            <p className="text-[10px] text-muted-foreground">
                                                Didn&apos;t get a code?
                                                <Button
                                                    variant="link"
                                                    className="text-[10px] p-0 mx-1"
                                                    onClick={() => {}}
                                                >
                                                    Click to resend
                                                </Button>
                                            </p>
                                        </FormDescription> */}
                           </FormItem>
                        )}
                     />
                  )}

                  {!showTwoFactor && (
                     <>
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
                                          type={!eyeOpen ? "password" : "text"}
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
                                 <Button
                                    variant="link"
                                    size="sm"
                                    asChild
                                    className="px-0 font-normal"
                                 >
                                    <Link href="/auth/reset">
                                       Forgot Password ?
                                    </Link>
                                 </Button>
                                 <FormMessage className="text-[12px]" />
                              </FormItem>
                           )}
                        />
                     </>
                  )}
               </div>

               <FormError message={error || urlError} />
               <FormSuccess message={success} />

               <div className=" flex gap-2 justify-end">
                  {/* <Button
                            className=""
                            variant="secondary"
                            type="button"
                            onClick={hundleCancle}
                        >
                            Cancle
                        </Button> */}
                  <Button type="submit" className="w-full">
                     {!isPanding ? (
                        showTwoFactor ? (
                           "Confrim"
                        ) : (
                           "Login"
                        )
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
