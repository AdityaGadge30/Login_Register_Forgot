import React , {useState , useEffect} from "react";
import {  Link } from "react-router-dom";
import axios from "axios";

function Dashboard(){


  function Logout(){     
    axios.get("/logout")
    .then(function(response){
    
        console.log(response);
    
    
     }).catch((err)=>{
          console.log(err);
    })
  }
  

    function Load(){
    
       
        axios.get("/dashboard")
        .then(function(response){
        
            console.log(response);
        
        
        }).catch((err)=>{
              console.log(err);
        })
  }
  
      useEffect(()=>{
        Load();
      }, []
    )
  

  return(

    <>

    <b>Hello, Welcome to Dashboard</b>





    <div>
      <input  type="button" className="btn" onClick={Logout} id="Aditya"/>
    </div>






      </>
    
    );
}
export default Dashboard;