
import { Schema } from "mongoose";
import { ProjectType } from "../types/projectType";

export interface idProjectSchema extends ProjectType {
    _id: string;
}

const projectSchema = new Schema<ProjectType>(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
    },
    {
        timestamps: true,
    }
);

export default projectSchema;