import { Router } from 'express';
import { isAuth } from "../middlewares/authMiddleware.js";
import gamesService from '../services/gameService.js';
import userService from '../services/userService.js';

const homeController = Router();

homeController.get('/', async (req, res) => {
    //Visualize the last 3 added post
    const getTopThreeGames = await gamesService.getTopThree().lean();
    // res.render('home', { getTopThreeGames, title: 'Home Page'});
    res.json(getTopThreeGames);
});

homeController.get('/profile', isAuth, async (req, res) => {
    const userId = req.user._id;
    // const gamesCreated = await gamesService.getServicesCreatedByUser(userId).lean();
    // const gamesSignedUp = await gamesService.getGamesSignedUpByUser(userId).lean();
    const user = await userService.owner(userId).lean();
    //console.log(devicesCreated);
    // res.render('home/profile', {gamesCreated, gamesSignedUp, title: 'Profile Page'});
    res.json(user);
});

// homeController.get('/about', (req, res) => {
//     res.render('home/about', {title: 'TechStore - About Us'});
// });

//to test authMiddleware
// homeController.get('/authorized', (req, res) => {
//     res.send(req.user);
// });

export default homeController;