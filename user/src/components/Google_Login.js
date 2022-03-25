

import GoogleLogin from 'react-google-login';
import axios from "axios";


import React from "react";










function Google_Login() {


  const responseSuccessGoogle = (response) =>{
    
    let tokenID = response.tokenId;
    axios.post("/googleLogin" , {tokenID})
    .then(response=>{
      console.log(response);
    })

  }

  
  const responseFailureGoogle = (response) =>{
    console.log(response);
  }
 

  return (
    <div className="App">
      
     

      <GoogleLogin
    clientId="289992240405-th8foi52sslkud3odjnpoq8i0bdkcsta.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseSuccessGoogle}
    onFailure={responseFailureGoogle}
    cookiePolicy={'single_host_origin'}
  />
    </div>
  );
}

export default Google_Login;
