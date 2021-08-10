const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    rating:{
        type: Boolean,
        required: true
    },
    date:{
        type: String,
        default: new Date().toISOString().slice(0, 10)
    } 
})

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    year:{
        type: String,
        required: true
    },
    image:{
        type: String,
        unique: true,
        required: true
    },
    genre:{
        type: String,
        required: true
    },
    studio:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    comments:[
        commentSchema
    ]
})

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;