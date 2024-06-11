import express from "express";

import { isAuthenticated } from "../middlewares/auth.js";
import { addGallery, addProject, addSkills, addYoutube, getUser, login, logout, myProfile, updateUser } from "../controller/User.js";
export const userRouter = express.Router();

userRouter.route("/login").post(login);

userRouter.route("/logout").get(logout);

userRouter.route("/user").get(getUser);

userRouter.route("/me").get(isAuthenticated, myProfile);

userRouter.route("/admin/update").put(isAuthenticated, updateUser);

userRouter.route("/admin/skills/add").post(isAuthenticated, addSkills);
userRouter.route("/admin/youtube/add").post(isAuthenticated, addYoutube);
userRouter.route("/admin/project/add").post(isAuthenticated, addProject);
userRouter.route("/admin/gallery/add").post(isAuthenticated, addGallery);

// userRouter.route("/admin/timeline/:id").delete(isAuthenticated, deleteTimeline);
// userRouter.route("/admin/youtube/:id").delete(isAuthenticated, deleteYoutube);
// userRouter.route("/admin/project/:id").delete(isAuthenticated, deleteProject);

// userRouter.route("/contact").post(contact);