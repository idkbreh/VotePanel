module.exports = (req,res,next) =>{
    if(req.session.userId !== 'Asdw#122'){ // ถ้าไม่มี session
        return res.redirect('/login')
    }
    next()
}