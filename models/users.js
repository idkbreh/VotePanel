const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Username: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Vote: {
        type: String,
    }
});
UserSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.Password, 5).then(hash => {
        user.Password = hash;
        next();
    }).catch(err => {
        console.log(err);
        next(err); // Pass the error to the next middleware
    });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;