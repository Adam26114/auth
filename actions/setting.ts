"use server";

import * as z from "zod";
import { SettingsSchema } from "@/schemas";

import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { error } from "console";

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
