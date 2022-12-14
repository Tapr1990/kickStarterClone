
import projectControllers from "../controllers/projectControllers";
import protect from "../models/authMiddleware";

import express from 'express';
const router = express.Router();

router.route("/")
.get(projectControllers.getProjectsController)
.post(protect, projectControllers.createProjectController);

router.route("/:id")
.get(projectControllers.getProjectController)
.put(protect, projectControllers.upadteProjectController)
.delete(protect, projectControllers.deleteProjectController);


export default router;
    