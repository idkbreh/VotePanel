const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    number: {
        type: Number,
        default: 0
    },
    candidate: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    votecount: {
        type: Number,
        default: 0
    },
    BL: {
        type: String,
        required: true
    },

});

const User = mongoose.model('games', GameSchema);
module.exports = User;