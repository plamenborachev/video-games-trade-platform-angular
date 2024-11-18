import { Schema, model, Types } from 'mongoose';
// import mongoose from 'mongoose';

const gameSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
        minLength: [5, 'The Title should be at least 5 characters, got \'{VALUE}\'!'],
    },
    ganre: {
        type: String,
        required: [true, 'Ganre is required!'],
        minLength: [3, 'The ganre should be at least 3 characters, got \'{VALUE}\'!'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [10, 'The Description should be at least 10 characters, got \'{VALUE}\'!'],
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        validate: [/^https?:\/\//, 'The Image should start with http:// or https://, got \'{VALUE}\'!'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'],
        min: [0, 'The Price should be a positive number, got \'{VALUE}\'!'],
    }, 
    signUpList: [
        {
            type: Types.ObjectId,
            ref: 'User'
        }
    ],
    owner: {
        type: Types.ObjectId,
        ref: 'User',
    },
},
{
    timestamps: true
}
);

// courseSchema.method('getUsername', function () {
//     return this.signUpList.map(x => x.username);
// })

const Game = model('Game', gameSchema);

export default Game;