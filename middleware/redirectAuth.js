module.exports = (req,res,next) =>{
    if(req.session.userId){ // ถ้ามี session
        return res.redirect('/')
    }
    next()
}