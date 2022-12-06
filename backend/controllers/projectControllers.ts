import { Response, Request } from "express";



const getProjects = (req: Request, res: Response) => {
    res.status(200).json({message: "Get all projects"});
};

const createProject = (req: Request, res: Response) => {

    if(req.body.title) {
        res.status(201).json({message: "Created project"});
    } else {
        
        res.status(400)
        throw new Error("Title is required");
    }
    
    
        


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