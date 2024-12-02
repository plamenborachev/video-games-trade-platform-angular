import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { corsMiddleware } from '../middlewares/cors.js';

export default function expressInit(app) {
    // app.use('/static', express.static('src/public'));
    // app.use(express.urlencoded({ extended: false }));
    app.use(express.json()); 

    app.use(corsMiddleware);

    // const corsOrigin ={
    //     origin:'http://localhost:4200/', //or whatever port your frontend is using
    //     credentials:true,            
    //     // optionSuccessStatus:200
    // }
    // app.use(cors(corsOrigin));

    var whitelist = ['http://localhost:4200', /** other domains if any */ ]
    var corsOptions = {
        credentials: true,
        origin: function(origin, callback) {
            if (whitelist.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        }
    }
    app.use(cors(corsOptions));

    // app.use(cors());

    app.use(cookieParser());
    app.use(authMiddleware);
};
