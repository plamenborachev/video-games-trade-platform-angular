import { Router } from 'express';
import authService from '../services/authService.js';
import { AUTH_COOKIE_NAME } from '../config/constants.js';
import { getErrorMessage } from '../utils/errorUtils.js';
import { isGuest, isAuth } from "../middlewares/authMiddleware.js"

const authController = Router();

authController.post('/register', isGuest, async (req, res) => {
    const { username, email, telephone, password, rePassword } = req.body;

    //console.log(req.body);

    try{
        const token = await authService.register(username, email, telephone, password, rePassword);
        res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });
        // res.redirect('/');
        const user = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        // console.log(user);
        res.json(user);
    } catch(err) {
        // const error = getErrorMessage(err);
        // res.render('auth/register', {title: 'Register Page', username, email, error});
        res.status(401).json({ message: getErrorMessage(err) })
    }
});

authController.post('/login', isGuest, async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);
        // console.log(token);
        res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });
        // res.redirect('/');
        const user = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        // console.log(user);
        res.json(user);
    } catch(err){
        // const error = getErrorMessage(err);
        // res.render('auth/login', {title: 'Login Page', email, error});
        res.status(401).json({ message: getErrorMessage(err) });
    }    
});

authController.get('/logout', isAuth, (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);
    // res.redirect('/');
    res.status(204).end();
});

export default authController;
