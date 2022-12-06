import * as express from 'express';
import { PORT } from './utils/config';

const app = express();
app.use(express.json());

import routes from './routes/projectRoutes';

app.use("/api/projects", routes);

app.listen(PORT, () => {
    console.log(`SERVER STARTED ON PORT ${PORT}`);
});
