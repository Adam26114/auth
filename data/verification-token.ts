import { db } from "@/lib/db";

export const getVerificationTokenByToken= async (token: string) => {
    try {
        const varificationToken = await db.verificationToken.findUnique({
            where: { token },
        });

        return varificationToken;
    } catch {
        return null;
    }
};


export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const varificationToken = await db.verificationToken.findFirst({
            where: { email },
        });

        return varificationToken;
    } catch {
        return null;
    }
};
