const router = require("express").Router();
const User = require("../models/User.js");
const path = require('path');

router.get("/",async (req,res) => {
    console.log(req.query)
    let data;
    if(req.query.category){
        data = await User.find({
                isApproved:true,
                category:req.query.category,
            },{"password":0,"_id":0,"_v":0,"email":0,"date":0,"token":0,"isApproved":0
        })
    }else{
        data = await User.find({
            isApproved:true,
        },{"password":0,"_id":0,"_v":0,"email":0,"date":0,"token":0,"isApproved":0
        })
    }
    filteredData = []
    if(req.query.name){
        data.forEach(e => {
            console.log(e.name);
            if(e.name.toLowerCase().includes(req.query.name.toLowerCase())){
                filteredData.push(data)
            }
        })
    }else{
        filteredData = data
    }
    return res.render(path.join(__dirname + '/../views/index.ejs'),{data:filteredData});
});
/*
router.get("/about",getUID,async (req,res) => {
    let user = await User.findOne({_id:req.id})
    if(!user){
        return res.redirect("/api/logout")
    }
    console.log(user.token)
    return res.render(path.join(__dirname + '/../views/profile.ejs'),{token:user.token});
});

router.get("/",(req,res) => {
    return res.send("e")
});

router.post("/people",async (req,res) => {
    if(!req.headers.auth){
        return res.status(403).json({"success":false,"error":"No auth token"})
    }
    let user = await User.findOne({token:req.headers.auth});
    if(!user){
        return res.status(403).json({"success":false,"error":"Invalid token"})
    }
    console.log(req.body)
    if(!req.body.action || !req.body.count){
        return res.status(400).json({"success":false,"error":"Malformed request"})
    }
    if(req.body.action == "add"){
        user.people += req.body.count
    }else if(req.body.action == "subtract"){
        user.people -= req.body.count
    }
    await user.save()
    return res.status(200).json({"success":true,"count":user.people})
})
*/
module.exports=router;