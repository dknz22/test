import { Router } from "express";
import * as authController from "./auth.controller.js";
import { validate } from "../../middleware/validate.js";
import { loginSchema, refreshSchema, registerSchema } from "./auth.schema.js";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.post("/refresh", validate(refreshSchema), authController.refresh);
router.post("/logout", authController.logout);

export default router;