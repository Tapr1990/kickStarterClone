import { Response, Request } from "express";

const express = require("express");
const routes = express.Router();


routes.get("/api/projects", (req: Request, res: Response) => {
    res.json({message: "Get all projects"});
});
routes.post("/api/projects", (req: Request, res: Response) => {
    res.json({message: "Create project"});
});
routes.get("/api/projects/:id", (req: Request, res: Response) => {
    console.log(req);
    console.log("********");
    console.log(req.params);

    res.json({message: `Get Project ${req.params.id}`});
});
routes.put("/api/projects/:id", (req: Request, res: Response) => {
    res.json({message: `Update Project ${req.params.id}`});
})
routes.delete("/api/projects/:id", (req: Request, res: Response) => {
    res.json({message: `Delete Project ${req.params.id}`});
});
    
export default routes;