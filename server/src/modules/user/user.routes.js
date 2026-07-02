import { Router } from "express";
import * as userController from "./user.controller.js";
import { authGuard } from "../../middleware/authGuard.js";
import { validate } from "../../middleware/validate.js";
import { changePasswordSchema, updateProfileSchema } from "./user.schema.js";

const router = Router();

router.use(authGuard);

router.get("/", userController.getMe);
router.patch("/", validate(updateProfileSchema), userController.updateMe);
router.patch("/password", validate(changePasswordSchema), userController.changePassword);

export default router;