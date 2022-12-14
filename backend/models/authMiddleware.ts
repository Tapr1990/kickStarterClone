
import { getUserService } from "../services/userServices";
import { NextFunction, Response, Request } from 'express';
import { verifyToken } from '../services/tokenServices';
import { UserType } from '../types/userType';
import HttpException from '../utils/httpException';



const asyncHandler = require('express-async-handler');


export interface GetUserAuthInfoRequest extends Request {
    user: UserType;
}


const protect = asyncHandler(async (req: GetUserAuthInfoRequest, res: Response, next: NextFunction) => {

    if(!req.headers || !req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        throw new HttpException("Unauthorized", 401);
        
    }

    const token = req.headers.authorization.split(" ")[1];
    const decoded = verifyToken(token);
    req.user = await getUserService(decoded._id)
});

export default protect;