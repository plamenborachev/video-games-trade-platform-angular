import { Router } from 'express';

import homeController from './controllers/homeController.js';
import authController from './controllers/authController.js';
import gamesController from './controllers/gamesController.js';

const routes = Router();

routes.use(homeController);
routes.use('/auth', authController);
routes.use('/games', gamesController);

routes.all('*', (req, res) => {
    // res.render('home/404', {title:'404 Page'});
    res.status(404).json({ message: 'Page not found!' });
});

export default routes;