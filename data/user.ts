import { db } from "@/lib/db";
import { User } from "@prisma/client";

export const getUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const user = await db.user.findUnique({ where: { email } });
        return user;
    } catch {
        return null;
    }
};

export const getUserById = async (
    id: string | undefined
): Promise<User | null> => {
    try {
        if (typeof id === "string") {
            const user = await db.user.findUnique({ where: { id } });
            return user;
        }
        return null;
    } catch {
        return null;
    }
};
