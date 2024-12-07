import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import gamesService from "../services/gameService.js";
import userService from "../services/userService.js";

const gamesController = Router();

gamesController.post('/create', isAuth, async (req, res) => {
    const gameData = req.body;
    const ownerId = req.user._id;

    //console.log(deviceData);

    try {
        const game = await gamesService.create(gameData, ownerId);
        // res.redirect('/games/catalog');
        res.json(game);
    } catch (err) {
        // const errorMessage = getErrorMessage(err);
        // return res.render('game/create', { error: errorMessage, game: gameData, title: 'Create Page'});
        res.status(400).json({ message: getErrorMessage(err) });
    }
});

gamesController.get('/catalog', async (req, res) => {
    const games = await gamesService.getAll().lean();
    // res.render('game/catalog', { games, title: 'Catalog Page'});
    res.json(games);
});

gamesController.get('/search', async (req, res) => {
    const filter = req.query;
    // console.log(filter);
    const games = await gamesService.getAll(filter).lean();
    res.json(games);
});

gamesController.get('/details/:gameId', async (req, res) => {
    // const { game, owner, isOwner, signedUp, signUps } = await checkOwnerAndSignedUp(req, res);

    const gameId = req.params.gameId;
    let game = null;

    try {
        game = await gamesService.getOne(gameId).lean();
    } catch (err){
        console.log(err);
        res.status(400).json({ message: getErrorMessage(err) });
    }

    // console.log(device.preferredList);
    // console.log(req.user?._id);
    // console.log(isOwner);
    // console.log(preferred);

    // res.render('game/details', { game, owner, isOwner , signedUp, signUps, title: 'Details Page'});

    // const game = await gamesService.getOne(req.params.gameId);

    res.json(game);
});

gamesController.put('/like/:gameId', isAuth, async (req, res) => {
    const gameId = req.params.gameId;
    const userId = req.user._id;
    // const { game, owner, isOwner, signedUp, signUps} = await checkOwnerAndSignedUp(req, res);

    // console.log(device.preferredList);
    // console.log(req.user?._id);
    // console.log(isOwner);
    // console.log(preferred);

    // if (isOwner){
        // return res.render('game/details',
        //     { error: `You are owner of ${game.title} and can not sign up for it!`, game, owner, isOwner, signedUp, signUps, title: 'Details Page'});
        // res.setError('You cannot vote for this volcano!');
        // return res.redirect('/404');
    //     return res.status(400).json({ message: 'You cannot like this game!' });
    // }   

    // if (signedUp){
        // return res.already signed render('game/details',
        //     { error: 'You\'ve up for this game!', game, owner, isOwner, signedUp, signUps, title: 'Details Page'});
    //     return res.status(400).json({ message: 'You have already liked this game!' });
    // }

    try {        
        const signUpGame = await gamesService.signUp(gameId, userId);
        // res.redirect(`/games/details/${gameId}`);
        res.json(signUpGame);
    } catch(err){ 
        res.status(400).json({ message: getErrorMessage(err) });
    }    
});

gamesController.put('/edit/:gameId', isAuth, async (req, res) => {
    const gameData = req.body;
    const gameId = req.params.gameId;

    // const { game, owner, isOwner, signedUp, signUps} = await checkOwnerAndSignedUp(req, res);

    // if (!isOwner) {
        // return res.render('device/details',
        //     { game, isOwner: false, signedUp, signUps, error: 'You cannot edit this game!', title: 'Details Page'});
        // res.setError('You cannot delete this movie!');
        // return res.redirect('/404');
    //     return res.status(400).json({ message: 'You cannot edit this game!' });
    // }  

    try {
        const updatedGame = await gamesService.edit(gameId, gameData);
        // res.redirect(`/games/details/${gameId}`);
        res.json(updatedGame);
    } catch (err) {
        // const errorMessage = getErrorMessage(err);
        // return res.render('game/edit', { error: errorMessage, game: gameData, title: 'Edit Page' });
        res.status(400).json({ message: getErrorMessage(err) });
    }
});

gamesController.delete('/delete/:gameId', isAuth, async (req, res) => {    
    const gameId = req.params.gameId;
    // console.log("delete => " + gameId);
    // const { game, owner, isOwner, signedUp, signUps} = await checkOwnerAndSignedUp(req, res);

    // Check if owner
    // if (!isOwner) {
        // return res.render('game/details',
        //     { game, owner, isOwner: false, signedUp, signUps, error: 'You cannot delete this game!', title: 'Details Page'});
        // res.setError('You cannot delete this volcano!');
        // return res.redirect('/404');
        // return res.status(400).json({ message: 'You cannot delete this game!' });
    // }

    try {
        await gamesService.remove(gameId);
        // res.redirect('/games/catalog');
        res.status(204).end();
    } catch (err) {
        // console.log(err);
        res.status(400).json({ message: getErrorMessage(err) })
    }
});



async function checkOwnerAndSignedUp(req, res) {
    const gameId = req.params.gameId;
    const userId = req.user?._id;
    let game = null;
    let owner = null;

    try {
        game = await gamesService.getOne(gameId).lean();
        owner = await userService.owner(game?.owner).lean();
    } catch (err){
        console.log(err);
        res.status(400).json({ message: getErrorMessage(err) });
    }

    //console.log(game);
    //console.log(owner);

    if (!game){
        return res.status(400).json({ message: 'Game does not exists!' });
    }

    const isOwner = game?.owner && game.owner.toString() === userId;
    const signedUp = game?.likesList?.some(signUp => signUp._id.toString() === userId);
    const signUps = game?.likesList?.map(signUp => signUp.email).join(', ');

    // console.log(signUps);

    return { game, owner, isOwner, signedUp, signUps};
}

export default gamesController;