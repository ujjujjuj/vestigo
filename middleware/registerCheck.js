const User = require('../models/User.js');

module.exports =  async function registerMiddleware(req,res,next){
    //check if email exists
    const companyExists = await User.findOne({name:req.body.name});
    if(companyExists){
        return res.render(path.join(__dirname + '/../views/register.ejs'),{error:"Company already Exists"});
    }
    next();
}