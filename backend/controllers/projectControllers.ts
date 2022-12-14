import { Response, Request } from "express";
import asyncHandler from 'express-async-handler';

import { createProjectService, 
        deleteProjectService, 
        getProjectService, 
        getProjectsService, 
        updateProjectService 
} from "../services/projectServices";






const getProjectsController = asyncHandler(async (req: Request, res: Response) => {
    const projects = await getProjectsService();

    res.status(200).json(projects);
   
});

    


const createProjectController = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;

    const createdproject = await createProjectService(data);
   
    res.status(201).json(createdproject);
        
});


const getProjectController = asyncHandler(async (req: Request, res: Response) => {

   
    const id = req.params.id;

    const project = await getProjectService(id);
   
    res.status(200).json(project);

});
    

const upadteProjectController = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const body = req.body;

    const updatedProject = await updateProjectService(id, body);
   
    res.status(200).json(updatedProject);
   
});


    
const deleteProjectController = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;

    await deleteProjectService(id);
  
    res.status(200).json({message: `Project ${id} Deleted`});
  

});
   


    
export default { 
    getProjectsController, 
    createProjectController, 
    getProjectController, 
    upadteProjectController, 
    deleteProjectController 
};

        
    
    
    
        

   

        
        




       






