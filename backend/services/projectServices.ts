import { checkIsValidId } from '../dataBase/dataBase';
import Project from '../models/projectModel';
import { idProjectSchema } from '../schema/projectSchema';
import { ProjectType } from '../types/projectType';


export async function getProjectsService(): Promise<ProjectType[]> {
    try {
        const projects = await Project.find();
        if(!projects) {
            throw new Error("No Projects found");
        }
            
        return projects;

    } catch (err) {
        throw new Error("Error! projects not found");
        
    }

}

export async function createProjectService(project: ProjectType): Promise<ProjectType> {
    try {
       const newProject = await Project.create(project);

       if(!project) {
            throw new Error("Project not created");
            
       }
       return newProject;

    } catch (err) {
        throw new Error("Error creating project");
        
    }
}

export async function getProjectService(projectID: string): Promise<idProjectSchema> {

    checkIsValidId(projectID);

    try {
        const project = await Project.findById(projectID);

        if(!project) {
            throw new Error("Project not found");
        }
        return project;
            
    } catch (err) {
        throw new Error("Error finfing project");
        
    }
}

export async function updateProjectService(projectID: string, projectBody: ProjectType): Promise<idProjectSchema> {

    checkIsValidId(projectID);
    
    try {

        const project = await Project.findByIdAndUpdate(projectID, projectBody, {new: true});
        
        if(!project) {
            throw new Error("Project not found");
        }
        return project;

    } catch (err) {
        throw new Error("Project not update");
        
    }
        
}

export async function deleteProjectService(projectID: string): Promise<void> {

    checkIsValidId(projectID);
    
    try {

        const project = await Project.findByIdAndDelete(projectID);
    
        if(!project) {
            throw new Error("Project not found");
        }
        return;

    } catch (err) {
        throw new Error("Project not deleted");
        
    }
        
}

