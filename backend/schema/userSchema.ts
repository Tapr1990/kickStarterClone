
import { Schema } from "mongoose";
import { UserType } from "../types/userType";


export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export interface idUserSchema extends UserType {
    _id: string;
}

const userSchema = new Schema<UserType>(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            min: [6, 'Email must be at least 6 characters'],
            max: [50, 'Email must be less then 50 characters'],
            match: [
               emailRegex,
                'Please add a valid email',
            ],
        },
        password: {
            type: String,
            required: [true, "password is required"],
            min: [6, 'Email must be at least 6 characters'],
            max: [50, 'Email must be less then 50 characters']
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        resetPasswordToken: String,
        resetPasswordExpires: Date
    },
    {
        timestamps: true,
    }
);

export default userSchema;