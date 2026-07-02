import * as userService from "./user.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const getMe = asyncHandler(async (req, res) => {
    const user = await userService.getMe(req.user.id);
    res.json(user);
});

export const updateMe = asyncHandler(async (req, res) => {
    const user = await userService.updateMe(req.user.id, req.body);
    res.json(user);
});

export const changePassword = asyncHandler(async (req, res) => {
    const result = await userService.changePassword(req.user.id, req.body);
    res.json(result);
});