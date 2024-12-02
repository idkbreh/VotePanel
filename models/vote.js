const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
    studentid: {
        type: String,
        required: true
    },
    vote: {
        type: String,
        required: true
    },
});


const Vote = mongoose.model('vote',  voteSchema);
module.exports = Vote;