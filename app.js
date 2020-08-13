const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const sslRedirect = require('heroku-ssl-redirect');

const port = process.env.PORT || 8080

const dotenv = require("dotenv");
dotenv.config();

app = express()
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload())
app.use(cookieParser());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//app.use(sslRedirect())

const config = {
	useUnifiedTopology: true,
  	useNewUrlParser: true
}
mongoose.connect(process.env.DB_URL,config,function(){
    console.log("Connected to db")
});

/*****ROUTES*****/

//API account creation
const authRoute = require("./routes/auth")
app.use("/api",authRoute);
//API route
const apiRoute = require("./routes/api")
app.use("/api",apiRoute)
//index
const indexRoute = require("./routes/index")
app.use("/",indexRoute)

app.listen(port , () => {
    console.log("listening on port "+port)
})