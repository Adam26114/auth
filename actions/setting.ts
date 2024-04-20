"use server";

import * as z from "zod";
import { SettingsSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
   const user = await currentUser();
   if (!user) return { error: "Unautherized" };

   const dbUser = await getUserById(user.id);
   if (!dbUser) return { error: "Unautherized" };

   if (user.isOAuth) {
      values.email = undefined;
      values.password = undefined;
      values.newPassword = undefined;
      values.isTwoFactorEnabled = undefined;
   }

   if (values.email && values.email !== user.email) {
      const existingUser = await getUserByEmail(values.email);
      if (existingUser && existingUser.id !== user.id)
         return { error: "Email already in used!" };

      const verificationToken = await generateVerificationToken(values.email);
      await sendVerificationEmail(
         verificationToken.email,
         verificationToken.token,
      );
      return { success: "Verification email sent!" };
   }

   if (!values.newPassword) {
      // If newPassword is falsy, don't update the password
      values.password = undefined;
   }

   if (values.password && values.newPassword && dbUser.password) {
      const passwordsMatch = await bcrypt.compare(
         values.password,
         dbUser.password,
      );

      if (!passwordsMatch) {
         return { error: "Incorrect password!" };
      }

      const hashedNewPassword = await bcrypt.hash(values.newPassword, 10);
      values.password = hashedNewPassword;
      values.newPassword = undefined;
   }

   await db.user.update({
      where: {
         id: dbUser.id,
      },
      data: {
         ...values,
      },
   });

   return { success: "Setting Updated" };
};
