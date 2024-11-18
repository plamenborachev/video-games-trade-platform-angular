import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { authMiddleware } from '../middlewares/authMiddleware.js';

export default function expressInit(app) {
    // app.use('/static', express.static('src/public'));
    // app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use(cookieParser());
    app.use(authMiddleware);
};
