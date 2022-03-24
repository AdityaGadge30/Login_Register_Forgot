import React , {useState} from "react";
import {  Link } from "react-router-dom";

import axios from "axios";



function Register(){

  const [user , setUser] = useState({
    name:""  , email:"" , password:"" 
   });
 
   let name,value ;
   
 const handleInputs = (e) => {
   
   name=e.target.name;
   value=e.target.value;
  
   setUser({ ...user , [name]:value});
 }
 
 
function PostData(e){
   e.preventDefault();
  
  axios.post("/register" , user)
   .then(function(response){

     console.log(response);
     window.alert("Done " +  user.name);

   }).catch((err)=>{
     console.log(err);
   })
 
 }
 
 

  return(

    <>


      <div id="sss" >
      <form method="post" onSubmit={(e)=>PostData(e)}>
        
        <div>
          <input type="text" onChange={handleInputs} required="true" placeholder="enter your name" name="name" />
        </div>
       
        <div>
          <input type="email" onChange={handleInputs} required="true" placeholder="enter your email" name="email" />
        </div>
       
        <div>
          <input type="password" onChange={handleInputs} required="true" placeholder="enter your password" name="password" />
        </div>
      
        <div>
        
          <input  type="submit" className="btn" id="Aditya"/>
        </div>

      </form>
     </div>
    
      </>
    
    );
}
export default Register;