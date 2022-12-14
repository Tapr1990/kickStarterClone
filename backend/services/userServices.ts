import { checkIsValidId, sanitizeLoginUser, sanitizeUser } from "../sanitizers/userSanitizer";
import userModel from '../models/userModel';
import { idUserSchema } from '../schema/userSchema';
import { UserReturnType, UserType } from '../types/userType';
import bcrypt from 'bcryptjs';
import HttpException from "../utils/httpException";
import { generateToken } from "./tokenServices";


export async function getUsersService(): Promise<UserType[]> {
    try {
        const users = await userModel.find();
        if(!users) {
            throw new HttpException("No Users found", 404);
        }
            
        return users;

    } catch (err) {
        throw new HttpException(`Error! users not found: ${err.message}`, 400);
        
    }

}

export async function createUserService(user: UserType): Promise<UserReturnType> {

    const sanitizedUser = await sanitizeUser(user);
    
    //encrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(sanitizedUser.password, salt);

    try {
       const newUser = await userModel.create({
            username: sanitizedUser.username,
            email: sanitizedUser.email,
            password: hashedPassword,
            isAdmin: sanitizedUser.isAdmin
       });

       if(!newUser) {
            throw new HttpException("User not created", 400);
        }

        return {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: generateToken({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
            }),
        }
            
       

    } catch (err) {
        throw new HttpException(`Error creating user: ${err.message}`, 400);
        
    }
}

export async function getUserService(userID: string): Promise<idUserSchema> {

    checkIsValidId(userID);

    try {
        const user = await userModel.findById(userID);

        if(!user) {
            throw new HttpException("User not found", 404);
        }
        return user;
            
    } catch (err) {
        throw new HttpException(`Error finding user: ${err.message}`, 400);
        
    }
}

export async function loginUserService(email: string, password: string): Promise<UserReturnType> {
    
    const sanitizedUser = await sanitizeLoginUser(email, password);

    try{
        const user = await userModel.findOne({ email });
        if(!user) {
            throw new HttpException("User not found", 404);
        }
         
        const isPasswordValid = await bcrypt.compare(sanitizedUser.password, user.password);
        if(!isPasswordValid) {
            throw new HttpException("Password is invalid", 401);
            
        }

        return {
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken({
                _id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
            }),
        }
      
        
    } catch (err) {
        throw new HttpException(`Failed to login user: ${err.message}`, 401);
    }
        
}

export async function updateUserService(userID: string, userBody: UserType): Promise<idUserSchema> {

    checkIsValidId(userID);
    const sanitizedUser = await sanitizeUser(userBody);
    
    try {

        const updateUser = await userModel.findByIdAndUpdate(userID, sanitizedUser, {new: true});
        
        if(!updateUser) {
            throw new HttpException("User not found", 404);
        }
        return updateUser;

    } catch (err) {
        throw new HttpException(`User not update: ${err.message}`, 400);
        
    }
        
}

export async function deleteUserService(userID: string): Promise<void> {

    checkIsValidId(userID);
    
    try {

        const deletedUser = await userModel.findByIdAndDelete(userID);
    
        if(!deletedUser) {
            throw new HttpException("User not found", 404);
        }
        return;

    } catch (err) {
        throw new HttpException(`User not deleted: ${err.message}`, 400);
        
    }
        
}

