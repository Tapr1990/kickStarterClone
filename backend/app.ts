import * as express from 'express';

import routes from './routes/projectRoutes';
import { errorHandler } from './middleware/errorMiddleware';

const app = express();
app.use(express.json());

app.use("/api/projects", routes);


app.use(errorHandler);


export default app;