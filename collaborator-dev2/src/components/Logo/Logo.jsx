import React from "react";
import logo from "../../assets/img/logo.png"


import "./Logo.css";

const Logo = () => {
    return (
        <div className="logo">
            <div className="logo-icon">
               <img className="neki" src={logo} alt="neki"/>
            </div>
        </div>
    )
}

export default Logo

