
import projectControllers from "../controllers/projectControllers";

const express = require("express");
const router = express.Router();

router.route("/")
.get(projectControllers.getProjects)
.post(projectControllers.createProject);

router.route("/:id")
.get(projectControllers.getProject)
.put(projectControllers.upadteProject)
.delete(projectControllers.deleteProject);


export default router;
    