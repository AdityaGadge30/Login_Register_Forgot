
var mongoose = require("mongoose");
const crypto = require("crypto");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const userSchema = new mongoose.Schema({


        name: {
            type: String,
            required: [true, "Please enter a name"],
        },        
        email: {
            type: String,
            required: [true, "Please enter an email"],
            unique: [true, "Email already exist"],
        },
        password: {
            type: String,
            required: [true, "Please enter a password"],
            minlength: [6, "Password must be at least 6 characters"],
            select: false
        },
        ForgotPasswordToken : {
            type : String
        },
        ForgotPasswordExpiry : {
            type : Date
        }
});

userSchema.pre("save",async function(next){
if(this.isModified("password")){
  this.password=await bcrypt.hash(this.password,10)
}
next();})


userSchema.methods.getForgotPasswordToken = function(){

  const forgotToken = crypto.randomBytes(20).toString("hex");

  console.log(forgotToken);
  this.ForgotPasswordToken = crypto
  .createHash("sha256")
  .update(forgotToken)
  .digest("hex");

  this.ForgotPasswordExpiry = Date.now() + 20*60*1000;

  

  return forgotToken;
}


userSchema.methods.matchPassword=async function(password){
  return await bcrypt.compare(password,this.password)
}



userSchema.methods.generateToken = function (){
return jwt.sign({_id:this._id},process.env.JWT_SECRET)
}

let model = mongoose.model("User", userSchema)


module.exports = model;
