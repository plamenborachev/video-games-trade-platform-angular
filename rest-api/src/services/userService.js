import User from '../models/User.js'

const owner = (userId) => User.findById(userId);

const edit = (userId, data) => User.findByIdAndUpdate(userId, data, {runValidators: true});

export default {
    owner,
    edit,
}