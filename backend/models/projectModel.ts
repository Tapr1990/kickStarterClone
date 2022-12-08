import { model } from "mongoose";
import projectSchema, { idProjectSchema } from "../schema/projectSchema";

const projectModel = model<idProjectSchema>("Project", projectSchema);

export default projectModel;