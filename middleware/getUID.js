const jwt = require("jsonwebtoken");

module.exports = async function(req,res,next){
    if(!req.cookies.auth){
        return res.redirect("/api/login");
    }
    let token = req.cookies.auth;
    let uid;
    jwt.verify(token,process.env.JWT_SECRET,(err,authData) => {
        if(err){
			return res.redirect('/api/logout');	
		}
        if(authData._id){
            uid = authData._id;
        }else{
            uid = authData.id;
        }
    });
    req.id = uid;
    next();
}