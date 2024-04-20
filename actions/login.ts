"use server";

import * as z from "zod";

import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULF_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken, generateTwoFactorToken } from "@/lib/token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { db } from "@/lib/db";
import { getTwoFactorCongimationByUserId } from "@/data/two-factor-confirmation";

export const login = async (
   value: z.infer<typeof LoginSchema>,
   callbackUrl?: string,
) => {
   const validatedFields = LoginSchema.safeParse(value);

   if (!validatedFields.success) {
      return { error: "Invalid fields !" };
   }

   const { email, password, code } = validatedFields.data;

   const existingUser = await getUserByEmail(email);

   if (!existingUser || !existingUser.email || !existingUser.password)
      return { error: "Email does not exist!" };

   if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(
         existingUser.email,
      );

      await sendVerificationEmail(
         verificationToken.email,
         verificationToken.token,
      );

      return { success: "Confirmation email sent!" };
   }

   if (existingUser.isTwoFactorEnabled && existingUser.email) {
      if (code) {
         const twoFactorToken = await getTwoFactorTokenByEmail(
            existingUser.email,
         );

         if (!twoFactorToken) return { error: "Invaild code!" };

         if (twoFactorToken.token !== code) return { error: "Invaild code!" };

         const hasExpired = new Date(twoFactorToken.expires) < new Date();

         if (hasExpired) return { error: "Code expired!" };

         await db.twoFactorToken.delete({
            where: {
               id: twoFactorToken.id,
            },
         });

         const existingConfirmation = await getTwoFactorCongimationByUserId(
            existingUser.id,
         );

         if (existingConfirmation) {
            await db.twoFactorConfirmation.delete({
               where: {
                  id: existingConfirmation.id,
               },
            });
         }

         await db.twoFactorConfirmation.create({
            data: {
               userId: existingUser.id,
            },
         });
      } else {
         const twoFactorToken = await generateTwoFactorToken(
            existingUser.email,
         );

         await sendTwoFactorTokenEmail(
            twoFactorToken.email,
            twoFactorToken.token,
         );

         return { twoFactor: true };
      }
   }

   try {
      await signIn("credentials", {
         email,
         password,
         redirectTo: callbackUrl || DEFAULF_LOGIN_REDIRECT,
      });
   } catch (error) {
      if (error instanceof AuthError) {
         switch (error.type) {
            case "CredentialsSignin":
               return { error: "invalid credentials!" };
            default:
               return { error: "Somethings went wrong!" };
         }
      }

      throw error;
   }
};
