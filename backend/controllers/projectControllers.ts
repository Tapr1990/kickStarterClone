import { Response, Request } from "express";
import mongoose from "mongoose";
import Project from '../models/projectModel';
const asyncHandler = require("express-async-handler");


const getProjects = asyncHandler(async (req: Request, res: Response) => {
    const projects = await Project.find();
    res.status(200).json(projects);
});


const createProject = asyncHandler(async (req: Request, res: Response) => {

    if(req.body.title) {
        const project = await Project.create(req.body);
        if(!project) {
            res.status(400)
            throw new Error("Project not created");
        }
        res.status(201).json(project);
    } else {
        
        res.status(400)
        throw new Error("Title is required");
    }
    
});
    
        
const getProject = asyncHandler(async (req: Request, res: Response) => {
    /*console.log(req);
    console.log("********");
    console.log(req.params);*/

   
    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error(`${id} is not a valid id`);
    }

    const project = await Project.findById(id);

    if(!project) {
        res.status(404);
        throw new Error("Project not found");
    }
    res.status(200).json(project);
        
});


const upadteProject = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const body = req.body;

    if(!req.body.title) {
        res.status(400)
        throw new Error("Title is required");
    }
   
    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error(`${id} is not a valid id`);
    }

    const project = await Project.findByIdAndUpdate(id, body, {new: true});

    if(!project) {
        res.status(404);
        throw new Error("Project not found")
    }
    res.json(project);

});


const deleteProject = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error(`${id} is not a valid id`);
    }
  
    const project = await Project.findByIdAndDelete(id);

    if(!project) {
        res.status(404);
        throw new Error("Project not found");
    }
    res.status(200).json({ 
        message: `Project ${id} Deleted`, 
        project: project
    });


});

export default {getProjects, createProject, getProject, upadteProject, deleteProject};



