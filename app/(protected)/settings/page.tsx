"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsSchema } from "@/schemas";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BsFillGearFill } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { useTransition, useState } from "react";
import { settings } from "@/actions/setting";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loading from "@/components/loading";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";

import { UserRole } from "@prisma/client";
import { Switch } from "@/components/ui/switch";

const SettingsPage = () => {
   const user = useCurrentUser();

   const [error, setError] = useState<string | undefined>();
   const [success, setSuccess] = useState<string | undefined>();

   const { update } = useSession();

   const [isPanding, startTransition] = useTransition();

   const [eyeOpen, setEyeOpen] = useState(false);

   function hundleEyeOpen() {
      setEyeOpen(!eyeOpen);
   }

   const form = useForm<z.infer<typeof SettingsSchema>>({
      resolver: zodResolver(SettingsSchema),
      defaultValues: {
         name: user?.name || undefined,
         email: user?.email || undefined,
         password: undefined,
         newPassword: undefined,
         role: user?.role || undefined,
         isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
      },
   });

   const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
      setError("");
      setSuccess("");
      startTransition(() => {
         settings(values)
            .then((data) => {
               if (data.error) return setError(data.error);

               if (data.success) {
                  update();
                  setSuccess(data.success);
               }
            })
            .catch(() => setError("Something went wrong!"));
      });
   };

   return (
      <Card className="w-[600px] bg-secondary">
         <CardHeader>
            <p className="text-2xl font-semibold text-center flex items-center justify-center gap-1">
               <BsFillGearFill /> Settings
            </p>
         </CardHeader>
         <CardContent>
            <Form {...form}>
               <form
                  className=" space-y-6"
                  onSubmit={form.handleSubmit(onSubmit)}
               >
                  <div className=" space-y-4">
                     <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                 <Input
                                    {...field}
                                    placeholder="Your Name"
                                    className="bg-white"
                                    disabled={isPanding}
                                 />
                              </FormControl>
                              <FormMessage className="text-[12px]" />
                           </FormItem>
                        )}
                     />

                     {user?.isOAuth === false && (
                        <>
                           <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                       <Input
                                          {...field}
                                          placeholder="Your Name"
                                          className="bg-white"
                                          disabled={isPanding}
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
                                             placeholder="Your password"
                                             className="bg-white"
                                             type="password"
                                          />
                                       </div>
                                    </FormControl>
                                    <FormMessage className="text-[12px]" />
                                 </FormItem>
                              )}
                           />

                           <FormField
                              control={form.control}
                              name="newPassword"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                       <div className="relative">
                                          <Input
                                             disabled={isPanding}
                                             {...field}
                                             placeholder="Your New password"
                                             className="bg-white"
                                             type={
                                                !eyeOpen ? "password" : "text"
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
                        </>
                     )}

                     <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Role</FormLabel>
                              <Select
                                 disabled={isPanding}
                                 onValueChange={field.onChange}
                                 defaultValue={field.value}
                              >
                                 <FormControl>
                                    <SelectTrigger className="bg-white">
                                       <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                    <SelectItem value={UserRole.ADMIN}>
                                       ADMIN
                                    </SelectItem>
                                    <SelectItem value={UserRole.USER}>
                                       USER
                                    </SelectItem>
                                 </SelectContent>
                              </Select>
                           </FormItem>
                        )}
                     />

                     {user?.isOAuth === false && (
                        <FormField
                           control={form.control}
                           name="isTwoFactorEnabled"
                           render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-white">
                                 <div className=" space-y-0.5">
                                    <FormLabel>
                                       Two Factor Authentication
                                    </FormLabel>
                                    <FormDescription>
                                       Enable two factor authentication for your
                                       account
                                    </FormDescription>
                                 </div>
                                 <FormControl>
                                    <Switch
                                       disabled={isPanding}
                                       checked={field.value}
                                       onCheckedChange={field.onChange}
                                    />
                                 </FormControl>
                              </FormItem>
                           )}
                        />
                     )}
                  </div>
                  <FormError message={error} />
                  <FormSuccess message={success} />
                  <Button type="submit" className="w-full" disabled={isPanding}>
                     {!isPanding ? "Save" : <Loading type="text" />}
                  </Button>
               </form>
            </Form>
         </CardContent>
      </Card>
   );
};

export default SettingsPage;
