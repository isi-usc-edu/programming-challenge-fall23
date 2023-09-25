import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./login.css";

export const Login = () => {
    return (

        <div className="login">
    
          <div className="shopTitle">
            <h1>Login to Your Shop</h1>
          </div>
    
          <div className="form">
          {/* <p>Microphone: {listening ? 'on' : 'off'}</p> */}
    
            <input type="text" id="fname" name="firstname" placeholder=''/>
            <Link to="/shop"><span className="buttons">
            <button className='button button1' >Login</button>
            </span>
            </Link>
    
          </div>
    
        </div>
      );
};
