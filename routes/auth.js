const router = require("express").Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require('path');
const regMw = require('../middleware/registerCheck')
const loginMw = require('../middleware/loginCheck')
const crypto = require('crypto')

router.get("/register",regMw,(req,res) => {

    if(req.cookies['auth']!=null){
        return res.redirect("/api/profile");
    };

    return res.render(path.join(__dirname + '/../views/register.ejs'),{error:[]});
});

router.get("/login",(req,res) => {

    if(req.cookies['auth']!=null){
        return res.redirect("/api/profile");
    };

    return res.render(path.join(__dirname + '/../views/login.ejs'),{error:[]});
});

router.post("/register",async (req,res) => {

    //hash password
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(req.body.password,salt);
    //api token
    let token = crypto.randomBytes(28).toString('hex');
    //create user
    let user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword,
        category:req.body.category,
        coords:[req.body.lat,req.body.long],
        capacity:req.body.capacity,
        url:req.body.url,
        token:token,
        date:Date.now() + 1000*60*60*5.5
    });
    //save user and assign jwt
    try{
        await user.save();
        let token = jwt.sign({id:user._id},process.env.JWT_SECRET);
        res.cookie("auth",token,{maxAge:2*24*60*60*1000});
        return res.redirect("/api/profile");
    }catch(e){
        console.log(e)
        return res.render(path.join(__dirname + '/../views/register.ejs'),{error:"Cannot create user!"});
    }
    
});

router.post("/login",loginMw,async (req,res) => {

    //check if password is correct
    let user = await User.findOne({email:req.body.email})
    const validPass = await bcrypt.compare(req.body.password, user.password);
    console.log(validPass)
    if(!validPass){
        return res.render(path.join(__dirname + '/../views/login.ejs'),{error:"Incorrect password"});
    }
    //create token and set cookie
	const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);
    res.cookie("auth",token,{maxAge:2*24*60*60*1000});
	return res.redirect("/api/profile");
    
});

router.get('/logout',(req,res) => {
    res.cookie("auth","goodbye",{expires: new Date()});
    res.redirect("/api");
})

module.exports=router;