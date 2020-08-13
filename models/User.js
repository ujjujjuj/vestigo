const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	pic:{
		type:String,
		default:""
	},
	isApproved:{
		type:Boolean,
		default:true
	},
    category:{
        type:String,
		required:true
	},
	url:{
		type:String,
		required:true
	},
    coords:{
        type:Array,
		required:true
    },
    capacity:{
        type:Number,
		required:true
	},
	token:{
		type:String,
		required:true
	},
	people:{
		type:Number,
		default:0
	},
	date:{
		type:Date,
		required:true
	}
});

module.exports = mongoose.model("User",userSchema);