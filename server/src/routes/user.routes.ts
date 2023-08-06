import express from "express";
import * as UserController from "../controllers/user.controller";

const router = express.Router();

router.route("/").post(UserController.CreateUser);
router.route("/:id").get(UserController.GetUserById);
router.route("/").get(UserController.GetUserList);
router.route("/:id").patch(UserController.EditUser);

export default router;