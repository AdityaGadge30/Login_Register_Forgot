import React , {useState} from "react";
import {  Link , useHistory } from "react-router-dom";

import axios from "axios";



function UserLogin(){


 
  const [user , setUser] = useState({
    email:"" , password:"" 
   });
 
   let name,value ;
   
 const handleInputs = (e) => {
   console.log(e);
   name=e.target.name;
   value=e.target.value;
  
   setUser({ ...user , [name]:value});
 }
 
 
 function PostData(e){
   e.preventDefault();

  axios.post("/login" , user)
   .then(function(response){
      console.log(response);
     
   }).catch((err)=>{
     console.log(err);
   })
 
 }
 
 

  return(

    <>


      <div id="samarth" >
      <form method="post" onSubmit={(e)=>PostData(e)}>
        
        
        <div>
          <input type="email" onChange={handleInputs} required="true" placeholder="enter your email" name="email" />
        </div>
        
        <div>
          <input type="password" onChange={handleInputs} required="true" placeholder="enter your password" name="password" />
        </div>
      
        <div>
        <br />
          <input  type="submit" className="btn" id="Aditya"/>
        </div>

      </form>
     </div>
    
      </>
    
    );
}
export default UserLogin;