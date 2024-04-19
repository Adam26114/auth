import { UserRole } from "@prisma/client";
import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().min(1, "Email is required").email(),
    password: z
        .string()
        .min(1, "Password is required")
        .regex(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
            "Password should containe a numeric, 1 lowercase and 1 uppercase letter!"
        ),
    code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required").email(),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password should be 6 to 20 characters long !")
        .regex(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
            "Password should containe a numeric, 1 lowercase and 1 uppercase letter!"
        ),
});

export const VerificationSchema = z.object({
    token: z
        .string()
        .min(1, "Verification code is required !")
        .min(6, "Your verification Code must be 6 characters !"),
});

export const ResetSchema = z.object({
    email: z.string().min(1, "Email is required").email(),
});

export const NewPasswordSchema = z.object({
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password should be 6 to 20 characters long !")
        .regex(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
            "Password should containe a numeric, 1 lowercase and 1 uppercase letter!"
        ),
});

export const SettingsSchema = z
    .object({
        name: z.optional(z.string()),
        isTwoFactorEnabled: z.optional(z.boolean()),
        role: z.enum([UserRole.ADMIN, UserRole.USER]),
        email: z.optional(z.string().email()),
        password: z.optional(
            z
                .string()
                .min(6)
                .regex(
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
                    "Password should containe a numeric, 1 lowercase and 1 uppercase letter!"
                )
        ),
        newPassword: z.optional(
            z
                .string()
                .min(6)
                .regex(
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
                    "Password should containe a numeric, 1 lowercase and 1 uppercase letter!"
                )
        ),
    })
    .refine(
        (data) => {
            if (data.newPassword && !data.password) {
                return false;
            }

            return true;
        },
        { message: "New password is required!", path: ["newPassword"] }
    )
    .refine(
        (data) => {
            if (data.password && !data.newPassword) {
                return false;
            }

            return true;
        },
        { message: "Password is required!", path: ["password"] }
    );
