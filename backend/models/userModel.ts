import { model } from "mongoose";
import userSchema, { idUserSchema } from "../schema/userSchema";

const userModel = model<idUserSchema>("User", userSchema);

export default userModel;