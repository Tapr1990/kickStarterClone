import userControllers from "../controllers/userController";

import express from 'express';
const router = express.Router();

router.route("/")
.get(userControllers.getUsersController)
.post(userControllers.createUserController);

router.route("/:id")
.get(userControllers.getUserController)
.put(userControllers.upadteUserController)
.delete(userControllers.deleteUserController);


export default router;