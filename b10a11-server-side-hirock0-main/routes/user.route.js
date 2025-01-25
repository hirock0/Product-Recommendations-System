import express from "express";
import {
  Login,
  Logout,
  Register,
  UserToken,
} from "../controllers/user.controller.js";
export const userRoutes = express.Router();
userRoutes.post("/register", Register);
userRoutes.post("/login", Login);
userRoutes.get("/userToken/:token", UserToken);
userRoutes.get("/logout", Logout);
