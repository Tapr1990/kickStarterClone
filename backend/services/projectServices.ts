import { checkIsValidId, sanitizeProject } from "../sanitizers/projectSanitizer";
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
        throw new Error(`Error! projects not found: ${err.message}`);
        
    }

}

export async function createProjectService(project: ProjectType): Promise<ProjectType> {

    const sanitizedProject = sanitizeProject(project);

    try {
       const newProject = await Project.create(sanitizedProject);

       if(!project) {
            throw new Error("Project not created");
            
       }
       return newProject;

    } catch (err) {
        throw new Error(`Error creating project: ${err.message} `);
        
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
        throw new Error(`Error finfing project: ${err.message}`);
        
    }
}

export async function updateProjectService(projectID: string, projectBody: ProjectType): Promise<idProjectSchema> {

    checkIsValidId(projectID);
    const sanitizedProject = sanitizeProject(projectBody);
    
    try {

        const project = await Project.findByIdAndUpdate(projectID, sanitizedProject, {new: true});
        
        if(!project) {
            throw new Error("Project not found");
        }
        return project;

    } catch (err) {
        throw new Error(`Project not update: ${err.message}`);
        
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
        throw new Error(`Project not deleted: ${err.message}`);
        
    }
        
}

