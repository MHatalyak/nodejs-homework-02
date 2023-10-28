import express from "express";

import authController from "../../controllers/auth-controller.js";

import {
  authenticate,
  bodyChecker,
  uploadAvatar,
  resizeAndSaveAvatar,
} from "../../middlewares/index.js";

import { validator } from "../../decorators/index.js";

import {
  userRegistSchema,
  userLoginSchema,
  userEmailSchema,
} from "../../models/user.js";

const userRegistValidate = validator(userRegistSchema);
const userLoginValidate = validator(userLoginSchema);
const userEmailValidate = validator(userEmailSchema);

const authRouter = express.Router();

authRouter.post(
  "/register",
  bodyChecker,
  userRegistValidate,
  authController.register
);

authRouter.post("/login", bodyChecker, userLoginValidate, authController.login);
authRouter.get("/verify/:verificationToken", authController.verify);

authRouter.post(
  "/verify",
  bodyChecker,
  userEmailValidate,
  authController.resendVerifyEmail
);
authRouter.get("/current", authenticate, authController.current);

authRouter.post("/logout", authenticate, authController.logout);

authRouter.patch(
  "/avatars",
  authenticate,
  uploadAvatar.single("avatar"),
  authController.avatarRestore
);
export default authRouter;
