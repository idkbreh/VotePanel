module.exports = (req,res) =>{
    res.render('login.ejs',{ err: req.flash('loginError')})
}
