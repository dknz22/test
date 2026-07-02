import * as authService from "./auth.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {
    const result = await authService.register(req.body);
    res.status(201).json(result);
});

export const login = asyncHandler(async (req, res) => {
    const result = await authService.login(req.body);
    res.json(result);
});

export const refresh = asyncHandler(async (req, res) => {
    const tokens = await authService.refresh(req.body);
    res.json(tokens);
})

export const logout = asyncHandler(async (_req, res) => {
    res.json({ success: true });
});