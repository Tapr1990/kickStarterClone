
import projectControllers from "../controllers/projectControllers";

import express from 'express';
const router = express.Router();

router.route("/")
.get(projectControllers.getProjectsController)
.post(projectControllers.createProjectController);

router.route("/:id")
.get(projectControllers.getProjectController)
.put(projectControllers.upadteProjectController)
.delete(projectControllers.deleteProjectController);


export default router;
    