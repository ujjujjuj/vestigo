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
                filteredData.push(e)
            }
        })
    }else{
        filteredData = data
    }
    return res.render(path.join(__dirname + '/../views/index.ejs'),{data:filteredData});
});

router.get("/map",async (req,res) => {
    data = await User.find({
        isApproved:true,
    },{"password":0,"_id":0,"_v":0,"email":0,"date":0,"token":0,"isApproved":0,"pic":0
    })
    return res.render(path.join(__dirname + '/../views/map.ejs'),{data:data});
});

router.get("/about",(req,res) => {
    return res.sendFile(path.join(__dirname + '/../views/about.html'))
});

module.exports=router;