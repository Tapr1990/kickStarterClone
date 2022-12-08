import mongoose from "mongoose";
import { ProjectType } from "../types/projectType";
import HttpException from "../utils/httpException";

export function checkIsValidId(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id)) {
        
        throw new HttpException(`${id} is not a valid id`, 400);
    }
}



export function sanitizeProject(project: ProjectType): ProjectType {

    let sanitizedProject = <ProjectType>{}

    sanitizedProject.title = sanitizeTitle(project.title);

    return sanitizedProject;
}

function sanitizeTitle(title: string): string {
    // Types
    if(title === undefined) {
        throw new HttpException("Title is undefined", 400);
    }
    if(typeof title !== "string") {
        throw new HttpException("Title is not a string", 400);
    }

    // Attributes
    title = title.trim();
    if(title.length < 3) {
        throw new HttpException("Title must be at least 3 characters", 400);
    }
    if(title.length > 50) {
        throw new HttpException("Title must be less then 50 characters", 400);
    }    
        
    return title;    
}