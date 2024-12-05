import jwt from '../lib/jwt.js';

import { AUTH_COOKIE_NAME, JWT_SECRET } from '../config/constants.js';
import { getErrorMessage } from "../utils/errorUtils.js";

//test by homeController.get('/authorized')
export const authMiddleware = async (req, res, next) => {
    const token = req.cookies[AUTH_COOKIE_NAME];
    if (!token) {
        return next();
    }

    try {
        const decodedToken = await jwt.verify(token, JWT_SECRET)
        //console.log(decodedToken);
        // const user = {
        //     _id: decodedToken._id,
        //     email: decodedToken.email,
        // };

        // req.user = user;
        req.user = decodedToken;
        req.isAuthenticated = true;

        // res.locals.userId = user._id;
        // res.locals.userEmail = user.email;
        res.locals.user = decodedToken;
        res.locals.isAuthenticated = true;

        next();
        //return next();
    } catch (err) {
        console.log(err);
        res.clearCookie(AUTH_COOKIE_NAME);               
        // return res.redirect('/auth/login');
        res.status(400).json({ message: getErrorMessage(err) });
    }
};

export const isAuth = (req, res, next) => {
    if (!req.user) {
    // if (!req.isAuthenticated) {
        // return res.redirect('/auth/login');
        return res.status(401).json({ message: 'Please login' });
    }
    
    next();
    //return next();
}

export const isGuest = (req, res, next) => {
    if (req.user) {
    // if (!req.isAuthenticated) {
        // return res.redirect('/404');
        return res.status(400).json({ message: 'Please logout' });
    }    
    next();
    //return next();
}
