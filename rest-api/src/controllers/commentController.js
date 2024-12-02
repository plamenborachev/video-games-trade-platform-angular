import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const commentController = Router();

// commentController.post('/create', isAuth, async (req, res) => {
//     const gameData = req.body;
//     const ownerId = req.user._id;

//     //console.log(deviceData);

//     try {
//         const game = await gamesService.create(gameData, ownerId);
//         // res.redirect('/games/catalog');
//         res.json(game);
//     } catch (err) {
//         // const errorMessage = getErrorMessage(err);
//         // return res.render('game/create', { error: errorMessage, game: gameData, title: 'Create Page'});
//         res.status(400).json({ message: getErrorMessage(err) });
//     }
// });