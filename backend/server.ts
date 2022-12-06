import * as express from 'express';
import { PORT } from './utils/config';

const app = express();
app.use(express.json());

import routes from './routes/projectRoutes';
import { errorHandler } from './middleware/errorMiddleware';

app.use("/api/projects", routes);


app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`SERVER STARTED ON PORT ${PORT}`);
});
