import mongoose from "mongoose";
import { emailRegex } from "../schema/userSchema";
import { UserType } from "../types/userType";
import HttpException from "../utils/httpException";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export function checkIsValidId(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id)) {
        
        throw new HttpException(`${id} is not a valid id`, 400);
    }
}



export async function sanitizeUser(users: UserType): Promise<UserType> {

    let sanitizedUser = <UserType>{}

    sanitizedUser.email = sanitizeEmail(users.email);
    sanitizedUser.password = await sanitizePassword(users.password);
    sanitizedUser.isAdmin = sanitizeIsAdmin(users.isAdmin);
    sanitizedUser.username = sanitizeUsername(users.username);

    //sanitizedProject.title = sanitizeTitle(project.title);

    return sanitizedUser;
}

export async function sanitizeLoginUser(email: string, password: string): Promise<UserType> {
    let sanitizedUser = <UserType>{};

    sanitizedUser.email = sanitizeEmail(email);
    sanitizedUser.password = await sanitizePassword(password);

    return sanitizedUser;
}


function sanitizeUsername(username: string): string {
    // Types
    if(username === undefined) {
        throw new HttpException("Username is undefined", 400);
    }
    if(typeof username !== "string") {
        throw new HttpException("Username is not a string", 400);
    }

    // Attributes
    username = username.trim();
   
        
    return username;    
}

function sanitizeIsAdmin(isAdmin: boolean): boolean {
    // Types
    if(!isAdmin) isAdmin = false;
    
    return isAdmin;    
}

function sanitizeEmail(email: string): string {
    // Types
    if(email === undefined) {
        throw new HttpException("Email is undefined", 400);
    }
    if(typeof email !== "string") {
        throw new HttpException("Email is not a string", 400);
    }

    // Attributes
    email = email.trim();
    if(email.length < 6) {
        throw new HttpException("Email must be at least 6 characters", 400);
    }
    if(email.length > 50) {
        throw new HttpException("Email must be less then 50 characters", 400);
    }    
    if(!email.match(emailRegex)) {
        throw new HttpException("Please add a valid email", 400);
    }

        
    return email;    
}

async function sanitizePassword(password: string): Promise<string> {
    // Types
    if(password === undefined) {
        throw new HttpException("Password is undefined", 400);
    }
    if(typeof password !== "string") {
        throw new HttpException("Password is not a string", 400);
    }

    // Attributes
    password = password.trim();
    if(password.length < 6) {
        throw new HttpException("Password must be at least 6 characters", 400);
    }
    if(password.length > 50) {
        throw new HttpException("Password must be less then 50 characters", 400);
    }    
  
    //encrypt

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;    
}
        
   
        

