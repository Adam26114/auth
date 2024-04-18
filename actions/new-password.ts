"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { NewPasswordSchema } from "@/schemas";
import { getPasswordRestTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token: string | null
) => {
    if (!token) return { error: "Missing token!" };

    const validatedFields = NewPasswordSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Invalid fields!" };

    const { password } = validatedFields.data;

    const existingToken = await getPasswordRestTokenByToken(token);
    if (!existingToken) {
        return { error: "Invalid token!" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
        return { error: "Token had expired" };
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) {
        return { error: "Email does not exist!" };
    }

    // Validate old password
    if (existingUser.password === null) {
        return { error: "Password not found for this user" };
    }

    const isSamePassword = await bcrypt.compare(
        password,
        existingUser.password
    );

    if (isSamePassword) return {error: "The new password cannot be the same as the old password"};

    const hashedPassword = await bcrypt.hash(password, 10);



    await db.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPassword },
    });

    try {
        await db.passwordResetToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    } catch (error) {
        console.error("Error deleting password reset token:", error);
        return { error: "Failed to update password. Please try again later." };
    }

    return { success: "Password updated!" };
};
