import {  Link , useHistory } from "react-router-dom";

import React , {useEffect, useState } from "react";

import axios from "axios";


function Reset(){


  
  const [user , setUser] = useState({
    email : "" , pass :"" , data:[]
 
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
   
   
  axios.post("/reset_pass" , user)
   .then(function(response){
    window.alert("Done");
   
   }).catch((err)=>{
     console.log(err);
   })
   
 }
 

 return(
        <>

       
    <div class="content">
      
      

      <form method="post" onSubmit={(e)=>PostData(e)}>
			<div className="email-div">		
				<input type="email" className="emaill" onChange={handleInputs} placeholder="Username of user" required={true} name="email" />
			</div>
			<div className="submit-div">
				<input  type="submit" className="btn btn-primary" id="Aditya"/>
			
				
			</div>
    	</form>

    </div>



	
	       		    



    </>
    
    );
}
export default Reset;