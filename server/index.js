var express = require("express");
const app = express();
var cors = require("cors");


const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


require("./src/connection/conn.js");
const User_Router = require("./Router/User_Router");
app.use(User_Router);

app.get("/" , (req , res)=>{
    res.send("Hello From Server");
});





app.listen(5000 , (req,res)=>{
    console.log("Server is running on port 5000");
})