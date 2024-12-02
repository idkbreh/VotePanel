module.exports = (req,res) =>{
    res.render('vote.ejs',{color:req.session.color,danger:req.flash('danger'), Schoolabb : process.env.SCHOOL_AKA,err: req.flash('loginError'),success: req.flash('loginSuccess'),studentID:req.session.studentid})
}
