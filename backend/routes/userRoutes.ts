import userControllers from "../controllers/userController";
import protect from "../models/authMiddleware";

import express from 'express';
const router = express.Router();

router.route("/")
.get(protect, userControllers.getUsersController)
.post(userControllers.createUserController);

router.route("/login").post(userControllers.loginUser);

router.route("/:id")
.get(userControllers.getUserController)
.put(protect, userControllers.upadteUserController)
.delete(protect, userControllers.deleteUserController);


export default router;