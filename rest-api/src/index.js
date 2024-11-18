import express from 'express';
import mongooseInit from './config/mongooseInit.js';
import expressInit from './config/expressInit.js';

import routes from './routes.js';
import { PORT } from './config/constants.js';

const app = express();

//Setup db
mongooseInit();
//Setup express
expressInit(app);

app.use(routes);

app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}...`));