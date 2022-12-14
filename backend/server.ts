import mongoose from 'mongoose';
import Colors from "colors.ts";

import app from "./app";
import { PORT } from './utils/config';

Colors;

mongoose
.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`)
.then( () => console.log("MongoDB is connected".blue.underline.bold))
.catch(err => console.error(err));



app.listen(PORT, () => {
    console.log(`SERVER STARTED ON PORT ${PORT}`.blue.underline.bold);
});








