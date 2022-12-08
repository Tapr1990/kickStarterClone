import { Response, Request } from "express";
import mongoose from "mongoose";
import { checkIsValidId } from "../dataBase/dataBase";

import { createProjectService, deleteProjectService, getProjectService, getProjectsService, updateProjectService } from "../services/projectServices";
const asyncHandler = require("express-async-handler");


const getProjectsController = asyncHandler(async (req: Request, res: Response) => {
    const projects = await getProjectsService();

    res.status(200).json(projects);
});


const createProjectController = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;

    if(!data) {
        res.status(400)
        throw new Error("Title is required");
        
    } else {
        const project = await createProjectService(data);
        if(!project) {
            res.status(404)
        }
        res.status(201).json(project);
        
    }
    
});
    
        
const getProjectController = asyncHandler(async (req: Request, res: Response) => {

   
    const id = req.params.id;

   

    const project = await getProjectService(id);

    if(!project) {
        res.status(404);
    }
    res.status(200).json(project);
        
        
});


const upadteProjectController = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const body = req.body;

    if(!req.body.title) {
        res.status(400)
        throw new Error("Title is required");
    }
   
    

    const project = await updateProjectService(id, body);

    if(!project) {
        res.status(404);
    }
    res.json(project);
       

});


const deleteProjectController = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;

  
  
    const project = await deleteProjectService(id);

   
    res.status(200).json({ 
        message: `Project ${id} Deleted`, 
        project: project
    });


});

export default {getProjectsController, createProjectController, getProjectController, upadteProjectController, deleteProjectController};



