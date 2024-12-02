module.exports = (req,res) => {
    res.render('register.ejs',{ err: req.flash('registerError')})
    
}