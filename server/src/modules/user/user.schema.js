import { z } from "zod";

export const updateProfileSchema = z
    .object({
        name: z.string().min(1).max(80).optional(),
        birthDate: z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}$/, "birthDate must be YYYY-MM-DD")
            .optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
        message: "Provide at leats one field to update",
    });

export const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, "currentPassword is required"),
    newPassword: z.string().min(6, "newPassword must be at least 6 characters"),
});