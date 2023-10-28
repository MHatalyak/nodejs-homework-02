import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import Jimp from "jimp";
import path from "path";
import gravatar from "gravatar";
import User from "../models/user.js";

import { HttpError } from "../helpers/index.js";

import { controlWrapper } from "../decorators/index.js";
import handleAvatar from "../middlewares/resizeAndSaveAvatar.js";
import resizeAndSaveAvatar from "../middlewares/resizeAndSaveAvatar.js";

const { JWT_SECRET } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const avatarURL = gravatar.url(email, { s: "250", d: "retro" });

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email,
      subcription: user.subscription,
    },
  });
};

const current = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204);
};

const avatarRestore = async (req, res) => {
  const { _id } = req.user;
  const avatar = await resizeAndSaveAvatar(req.file.buffer, _id);

  await User.findByIdAndUpdate(_id, { avatar });

  res.status(200).json({ avatar });
};

export default {
  register: controlWrapper(register),
  login: controlWrapper(login),
  current: controlWrapper(current),
  logout: controlWrapper(logout),
  avatarRestore: controlWrapper(avatarRestore),
};
