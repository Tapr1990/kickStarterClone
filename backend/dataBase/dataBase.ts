import mongoose from "mongoose";
import HttpException from "../utils/httpException";

export function checkIsValidId(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id)) {
        
        throw new HttpException(`${id} is not a valid id`, 400);
    }
}