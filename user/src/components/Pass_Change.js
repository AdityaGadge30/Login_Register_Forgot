import {  Link , useHistory , useParams} from "react-router-dom";

import React , {useEffect, useState } from "react";

import axios from "axios";

function Pass_Change(){

const { token }  = useParams();

  console.log(token)
  const [user , setUser] = useState({
     token :token , pass :"" , data:[]
 
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
   


   console.log(user.token);

   
  axios.post("/new_pass" , user ,{
    headers: {
      'Content-Type': 'application/json'
    }})
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
      	
				<input type="password" className="emaill" onChange={handleInputs} placeholder="Enter your new password" required={true} name="pass" />
			</div>
			<div className="submit-div">
      
				<input  type="submit" className="btn btn-primary" id="Aditya"/>
			
				
			</div>
    	</form>

    </div>



	
	       		    



    </>
    
    );
}
export default Pass_Change;