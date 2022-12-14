import { Response, Request } from "express";
import asyncHandler from 'express-async-handler';

import { createUserService, 
        deleteUserService, 
        getUserService, 
        getUsersService, 
        loginUserService, 
        updateUserService 
} from "../services/userServices";






const getUsersController = asyncHandler(async (req: Request, res: Response) => {
    const users = await getUsersService();

    res.status(200).json(users);
   
});

    


const createUserController = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;

    const createduser = await createUserService(data);
   
    res.status(201).json(createduser);
        
});


const getUserController = asyncHandler(async (req: Request, res: Response) => {

   
    const id = req.params.id;

    const user = await getUserService(id);
   
    res.status(200).json(user);

});


const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const userLogin = await loginUserService(req.body.email, req.body.password);

    res.status(200).json(userLogin);
});
    

const upadteUserController = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const body = req.body;

    const updatedUser = await updateUserService(id, body);
   
    res.status(200).json(updatedUser);
   
});


    
const deleteUserController = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;

    await deleteUserService(id);
  
    res.status(200).json({message: `User ${id} Deleted`});
  

});
   


    
export default { 
    getUsersController, 
    createUserController, 
    getUserController,
    loginUser, 
    upadteUserController, 
    deleteUserController 
};

        
    
    
    
        

   

        
        




       






