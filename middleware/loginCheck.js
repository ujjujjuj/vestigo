const User = require('../models/User.js');

module.exports = async function loginMiddleware(req,res,next){
    //redirect if already logged in
    if(req.cookies.auth){
        return res.redirect("/api");
    }
    //check if email exists
    const emailExists = await User.findOne({email:req.body.email});
    if(!emailExists){
        return res.render(path.join(__dirname + '/../views/login.ejs'),{error:"Email does not exist"});
    }
    console.log(emailExists)
    next()
}