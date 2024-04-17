import { db } from "@/lib/db";

export const getTwoFactorCongimationByUserId = async (userId: string) => {
    try {
        const getTwoFactorCongimation =
            await db.twoFactorConfirmation.findUnique({
                where: { userId },
            });

        return getTwoFactorCongimation;
    } catch {
        return null;
    }
};
