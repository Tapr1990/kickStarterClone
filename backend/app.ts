import express from 'express';

import projectRoutes from './routes/projectRoutes';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middleware/errorMiddleware';

const app = express();
app.use(express.json());

app.use("/api/projects", projectRoutes);
app.use("/api/users", userRoutes);


app.use(errorHandler);


export default app;