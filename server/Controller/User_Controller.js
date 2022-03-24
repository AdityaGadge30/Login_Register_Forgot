const User = require("../src/models/User_Model");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

require('request-promise-native').defaults({family:4})
const transporter = nodemailer.createTransport(sendgridTransport({

    auth : {
        api_key : "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"
    }
}))

module.exports.Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({
                    success: false,
                    message: "User Not Existed"
                })
        }else{

            const isMatch = await user.matchPassword(password)
            if (!isMatch) {
                return res.status(400).json({
                    sucess: false,
                    message: "Incorrect password",
                })
            }else{
            const token = await user.generateToken();
            const option = {
                expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            res.status(200).cookie("token", token, option).json({
                success: true,
                user,
                token,
            })
          }   
      }
    } catch (err) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            message: error.message
        })
    }
  };


  
module.exports.Register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email })
        if (user) {
            return res.
                status(400).
                json({ success: false, message: "User already exists" })
        }

        user = await User.create({ name , email , password })

        const token = await user.generateToken();
        const option = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }
        res.status(201).cookie("token", token, option).json({
            success: true,
            user,
            token,
        })
    }
    catch (err) {
      console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        })
    }
  };


  
module.exports.Dashboard = async (req, res, next) => {
    try {

        res.send("Welcome to secret information");
       
    } catch (err) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            message: error.message
        })
    }
  };


  module.exports.ForgotPass = async (req, res, next) => {
    try {
        

        const {email} = req.body

        const user = await User.findOne({email});
    
        if(!user){
            return res.send("user not found");
        }else{
    
    
            const forgotToken = user.getForgotPasswordToken();
            console.log(forgotToken);
            
            await user.save();
            const myurl = `${req.protocol}://localhost:3000/reset_pass/${forgotToken}`
            const message = `Copy paste this message on browser \n\n ${myurl}`;
    
            try {
                transporter.sendMail({
                    to:user.email,
                    from:"ppadi.257@gmail.com",
                    subject:"success",
                    html: message 
    
                })      
                res.status(200).json({
                    success:true,
                    message:"mail sended succesfully"
                })
                
            } catch (error) {
                
                user.ForgotPasswordToken = undefined
                user.ForgotPasswordExpiry = undefined
    
                await user.save();
    
                return res.send(error);
            }
    
        }



    } catch (err) {
        console.log(err);
        res.status(500).json({
            sucess: false,
            message: err.message
        })
    }
  };


  
  module.exports.ResetPass = async (req, res, next) => {
    try {
        

        const new_Password = req.body.pass
        const sentToken = req.body.token
   
   
        console.log(sentToken);
   
        const Encry_Token =  crypto
        .createHash("sha256")
        .update(sentToken)
        .digest("hex"); 
   
        
        
   
        User.findOne({ForgotPasswordToken : Encry_Token , ForgotPasswordExpiry : {$gt:Date.now()}})
           .then(user=>{
               if(!user){
   
                  
                   return res.status(422).json({error:"TRy again ... session expired"})
               }
               
               user.password = new_Password
               user.ForgotPasswordToken = undefined
               user.ForgotPasswordExpiry = undefined
   
   
                   
   
               user.save().then((saveduser)=>{
   
                   console.log(saveduser)
                   res.json({message:"password updated successfully"})
               })
           })
           .catch(err=>{
               console.log(err)
   })
   



    } catch (err) {
        console.log(err);
        res.status(500).json({
            sucess: false,
            message: err.message
        })
    }
  };
