import { Router } from 'express';
import { isAuth } from "../middlewares/authMiddleware.js";
import gamesService from '../services/gameService.js';

const homeController = Router();

homeController.get('/', async (req, res) => {
    //Visualize the last 3 added post
    const getTopThreeCourses = await gamesService.getTopThree().lean();
    // res.render('home', { getTopThreeCourses, title: 'Home Page'});
    res.json(getTopThreeCourses);
});

homeController.get('/profile', isAuth, async (req, res) => {
    const userId = req.user._id;
    const coursesCreated = await gamesService.getServicesCreatedByUser(userId).lean();
    const coursesSignedUp = await gamesService.getCoursesSignedUpByUser(userId).lean();
    //console.log(devicesCreated);
    // res.render('home/profile', {coursesCreated, coursesSignedUp, title: 'Profile Page'});
    res.json({ coursesCreated, coursesSignedUp});
});

// homeController.get('/about', (req, res) => {
//     res.render('home/about', {title: 'TechStore - About Us'});
// });

//to test authMiddleware
// homeController.get('/authorized', (req, res) => {
//     res.send(req.user);
// });

export default homeController;