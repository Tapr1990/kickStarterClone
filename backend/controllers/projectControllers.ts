import { Response, Request } from "express";



const getProjects = (req: Request, res: Response) => {
    res.json({message: "Get all projects"});
};

const createProject = (req: Request, res: Response) => {
    res.json({message: "Create projects"});
};

const getProject = (req: Request, res: Response) => {
    console.log(req);
    console.log("********");
    console.log(req.params);

   
    const data = req.params.id;

    res.json({message: `Get Project ${data}`});
};

const upadteProject = (req: Request, res: Response) => {
    const data = req.params.id;
    res.json({message: `Upadte project ${data}`});
};

const deleteProject = (req: Request, res: Response) => {
    const data = req.params.id;
    res.json({message: `Delete project ${data}`});
};

export default {getProjects, createProject, getProject, upadteProject, deleteProject};