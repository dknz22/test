import { z } from "zod";

export const registerSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 char"),
    name: z.string().min(1).max(80).optional(),
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(1, "Password is required"),
});

export const refreshSchema = z.object({
    refreshToken: z.string().min(1, "refreshToken is required"),
});