const bcrypt = require('bcrypt');
const Vote = require('../models/vote.js');

module.exports = (req, res) => {
    const { studentid } = req.body;

    if (studentid) {
        Vote.findOne({ studentid }).then((user) => {
            if (user) {
                if (user.vote === 'Yes') {
                    const Errors = "This ID has already voted.";
                    req.flash('danger', Errors);
                    return res.redirect('/');
                } else if (user.vote === 'No') {
                    const Errors = "You can only vote once.";
                    req.flash('loginSuccess', Errors);
                    req.session.studentid = user.studentid
                    return res.redirect('/vote');
                }
            } else {
                const newUser = new Vote({
                    studentid,
                    vote: 'No'
                });

                newUser.save().then(() => { // Create userr then store cookieeeee // fixed
                    const Errors = "Create new user vote";
                    req.session.studentid = studentid
                    req.flash('loginSuccess', Errors);
                    return res.redirect('/vote');
                }).catch((error) => {
                    console.error(error);
                    const Errors = "Error creating new user.";
                    req.flash('danger', Errors);
                    return res.redirect('/');
                });
            }
        });
    } else {
        const Errors = "Invalid student ID.";
        req.flash('loginError', Errors);
        return res.redirect('/login');
    }
};