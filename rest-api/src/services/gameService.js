import Game from '../models/Game.js'

const getAll = () => Game.find().populate('likesList owner');

const getTopThree = () => Game.find().populate('likesList owner').sort({createdAt: -1}).limit(3);

const getServicesCreatedByUser = (ownerId) => Game.find({ owner: ownerId });

const getGamesSignedUpByUser = (userId) => Game.find({ likesList: userId });

const create = (game, ownerId) => {Game.create({ ...game, owner: ownerId });}

const getOne = (gameId) => Game.findById(gameId).populate('likesList owner');

const signUp = (gameId, userId) => {
    return Game.findByIdAndUpdate(gameId, { $push: { likesList: userId } });
};

const remove = (gameId) => Game.findByIdAndDelete(gameId);

const edit = (gameId, data) => Game.findByIdAndUpdate(gameId, data, {runValidators: true});

export default {
    getAll,
    getTopThree,
    getServicesCreatedByUser,
    getGamesSignedUpByUser,
    create,
    getOne,
    signUp,
    remove,
    edit,
}