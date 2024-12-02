const bcrypt = require('bcrypt')
const User = require('../models/users')

module.exports = (req, res) => {
    const { email, password } = req.body
    console.log(email, password)
    User.findOne({ Email: email }).then((user) => {
        if (user && user.Password === password) {
            req.session.userId = user.Username;
            req.session.UniqueID = user._id;
            req.session.color = user.Vote;
            console.log(req.session.UniqueID);
            const successMessage = "Login Successfully!";
            req.flash('loginSuccess', successMessage);
            return res.redirect('/');
        } else {
            const Errors = "Email or Password NOT FOUND";
            req.flash('loginError', Errors);
            return res.redirect('/login');
        }
    })
}
