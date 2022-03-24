import React from "react";
import {BrowserRouter as Router , Routes , Route } from "react-router-dom";


import Register from "./components/Register";
import UserLogin from "./components/UserLogin";
import Start from "./components/Start";
import Dashboard from "./components/Dashboard";
import Reset from "./components/Reset";
import Pass_Change from "./components/Pass_Change";

function App() {
  return (

    
      
   
    
    <Router>
      <Routes>
          <Route path="/" element={<Start />} />

          <Route path="/Registration" element={<Register />} />
          <Route path="/dash" element={<Dashboard />} />

          <Route path="/UserLogin"element={<UserLogin />} />


          <Route path="/reset" element={<Reset />} />
          <Route path="/reset_pass/:token" element={<Pass_Change />} />

      </Routes>
    </Router>



  );
}

export default App;




