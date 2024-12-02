module.exports = (req,res) => {
    res.render('index.ejs',{Schoolabb : process.env.SCHOOL_AKA ,success: req.flash('loginSuccess'),ID:req.session.userId,color:req.session.color,
    danger: req.flash('danger')})
}