import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";
import "./slider.css"
import {
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
  } from "@mui/material";

interface cartitem {
    itemid: number;
    itemname: string;
    price: number;
    stock: boolean;
    store_email: string
  }
  

export default function CartPage() {
    const [cartItems, setCartItems] = useState<cartitem[]>([]);

    useEffect(() => {
        (async () => {
          try {
            const resp = await httpClient.get<{ cart_items: cartitem[] }>("//localhost:8000/mecart");
            setCartItems(resp.data.cart_items);
          } catch (error) {
            console.log("Not authenticated");
          }
        })();
      }, []);

    const handlePrint = () => {
        window.print(); // Trigger the print dialog
      };
    
    const handleEmail = () => {
        const emailSubject = "My Shopping List";
        const emailBody = cartItems
          .map((item) => `${item.itemname} - Price: $${item.price}`)
          .join("\n");
    
        // Construct the mailto URL
        const mailtoUrl = `mailto:?subject=${encodeURIComponent(
          emailSubject
        )}&body=${encodeURIComponent(emailBody)}`;
    
        // Open the user's default email client
        window.location.href = mailtoUrl;
      };
    
      const handleSendOrder = (cartItems: cartitem[]) => {
        if (cartItems.length === 0) {
          return;
        }
      
        // Create a dictionary to group cart items by store email
        const storeEmailToItems: { [key: string]: cartitem[] } = {};
      
        // Iterate through cart items and group them by store email
        cartItems.forEach((item) => {
          const storeEmail = item.store_email || "";
      
          if (!storeEmailToItems[storeEmail]) {
            storeEmailToItems[storeEmail] = [];
          }
      
          storeEmailToItems[storeEmail].push(item);
        });
      
        // Send separate emails to each store
        for (const storeEmail in storeEmailToItems) {
          if (storeEmailToItems.hasOwnProperty(storeEmail)) {
            const itemsForStore = storeEmailToItems[storeEmail];
      
            // Create email subject and body for this store
            const emailSubject = "Order from Customer";
            let emailBody = "Shopping List:\n";
      
            itemsForStore.forEach((item) => {
              emailBody += `${item.itemname} - Price: $${item.price}\n`;
            });
      
            const mailtoUrl = `mailto:${storeEmail}?subject=${encodeURIComponent(
              emailSubject
            )}&body=${encodeURIComponent(emailBody)}`;
      
            // Send email
            window.open(mailtoUrl);
          }
        }
      };
      
      
    
      return (
        <div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="h3">Your Shopping Cart</Typography> </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          {cartItems.length === 0 ? (
            <Typography variant="body1" style={{ fontSize: "20px" }}>Your cart is empty.</Typography>
          ) : (
            <List dense>
              {cartItems.map((cartitem) => (
                < ListItem key={cartitem.itemid}>  
                 <div className="custom-bullet">•</div>
                  <ListItemText
                    primary={
                        <Typography variant="h6" style={{ fontSize: "30px" }}>
                          {cartitem.itemname} </Typography>}
                    secondary={
                      <React.Fragment>
                        <Typography variant="body2" style={{ fontSize: "20px" }}>
                          Price: ${cartitem.price}
                        </Typography>
                        <Typography variant="body2" style={{ fontSize: "20px" }}>
                          Store email: {cartitem.store_email}
                        </Typography>
                        <Typography variant="body2" style={{ fontSize: "20px" }}>
                          Stock: {cartitem.stock ? "Available" : "Out of stock"}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px"}}>
          <Button variant="contained" onClick={handlePrint}>
            Print
          </Button> <Button variant="contained" onClick={handleEmail}>
            Email Family
          </Button> <Button variant="contained" onClick={() => handleSendOrder(cartItems)}>
            Email Store
          </Button>
          </div>
           </div>
      );
    }
