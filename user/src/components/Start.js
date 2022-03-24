import React , {useState} from "react";
import {  Link } from "react-router-dom";




function Start(){




  
 
 

  return(

    <>

    <Link to={"/Registration"}>
        <button type="button" class="user btn btn-primary btn-lg">Register</button>
    </Link>

    <Link to={"/UserLogin"}>
        <button type="button" class="user btn btn-primary btn-lg">Login</button>
    </Link>


    <Link to={"/reset"}>
					<button  className="btn btn-primary" >Forgot Password</button>
		</Link>
      </>

      
    
    );
}
export default Start;