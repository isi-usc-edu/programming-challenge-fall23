import React, { useState, useEffect, useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTS } from "../../products";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";

import "./cart.css";
export const Cart = () => {
  const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const [products, setData] = useState([]);

  const fetchdata = async () => {

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {

      fetch("https://fakestoreapi.com/products")
      .then(response => {
        
        return response.json()
      })
      .then(data => {
        setData(data)
      })

      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart">
        {products.map((product) => {
          if (cartItems[product.id] > 0) {
            return <CartItem data={product} />;
          }
        })}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <p> Subtotal: ${totalAmount} </p>
          <button onClick={() => navigate("/")}> Continue Shopping </button>
          <button
            onClick={() => {
              checkout();
              navigate("/checkout");
            }}
          >
            {" "}
            Checkout{" "}
          </button>
        </div>
      ) : (
        <h1> Your Shopping Cart is Empty</h1>
      )}
    </div>
  );
};
