import Game from '../models/Game.js'

const getAll = () => Game.find();

const getTopThree = () => Game.find().populate('owner').sort({createdAt: -1}).limit(3);

const getServicesCreatedByUser = (ownerId) => Game.find({owner: ownerId});

const getCoursesSignedUpByUser = (userId) => Game.find({ likesList: userId});

const create = (course, ownerId) => Game.create({ ...course, owner: ownerId });

const getOne = (courseId) => Game.findById(courseId).populate('likesList');

const signUp = (courseId, userId) => {
    // const movie = await Movie.findById(movieId);
    // movie.casts.push(castId);
    // return movie.save();
    return Game.findByIdAndUpdate(courseId, { $push: { likesList: userId } });
};

const remove = (courseId) => Game.findByIdAndDelete(courseId);

const edit = (courseId, data) => Game.findByIdAndUpdate(courseId, data, {runValidators: true});

export default {
    getAll,
    getTopThree,
    getServicesCreatedByUser,
    getCoursesSignedUpByUser,
    create,
    getOne,
    signUp,
    remove,
    edit,
}