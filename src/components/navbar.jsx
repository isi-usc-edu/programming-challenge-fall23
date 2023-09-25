import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import "./navbar.css";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="heading"><span className="font-link">Senior Citizen Shop</span></div>
      <div className="links">
        <Link to="/"> <span className="font-nav">Shop</span> </Link>
        <Link to="/contact"> <span className="font-nav">Contact</span> </Link>
        <Link to="/cart">
          <ShoppingCart size={32} />
        </Link>
      </div>
    </div>
  );
};
