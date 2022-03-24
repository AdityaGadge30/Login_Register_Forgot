var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/starter" , {
    useNewUrlParser:true,
    useUnifiedTopology:true
    
}).then(function (){
    console.log("connection sucessful");
}).catch(function(err){
    console.log(err);
});
    
 
