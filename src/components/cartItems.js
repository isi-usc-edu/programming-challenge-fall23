import React, { useState, useEffect } from 'react';
import './CartItemList.css';

function CartItemList({ cartItems }) {
  const [uniqueItems, setUniqueItems] = useState([]);
  const [itemCounts, setItemCounts] = useState({});

  useEffect(() => {
    const unique = [];
    const counts = {};

    cartItems.forEach((item) => {
      if (!unique.some((uniqueItem) => uniqueItem.id === item.id)) {
        unique.push(item);
      }
      counts[item.id] = (counts[item.id] || 0) + 1;
    });

    setUniqueItems(unique);
    setItemCounts(counts);
  }, [cartItems]);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const cartItemDetails = [];

    uniqueItems.forEach((item) => {
      const itemCount = itemCounts[item.id] || 0;
      const itemDetail = `${item.title} - Price: $${item.price} (Quantity: ${itemCount})`;
      cartItemDetails.push(itemDetail);
    });

    const cartItemText = cartItemDetails.join('\n');
    const emailSubject = 'Cart Items';
    const emailBody = `Here are the items in your cart:\n\n${cartItemText}`;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="cart-item-list">
      <h2 className="cart-header">Cart Items:</h2>
      <ul className="cart-list">
        {uniqueItems.map((item, index) => (
          <li key={index} className="cart-item">
            <div className="item-title">
              <strong>{item.title}</strong>
            </div>
            <div className="item-details">
              {/* <div className="item-id">ID: {item.id}</div> */}
              <div className="item-price">Price: ${item.price}</div>
              <div className="item-quantity">Quantity: {itemCounts[item.id] || 0}</div>
              <div className="item-rating">Rating: {item.rating}</div>
              {/* {item.images && item.images.length > 0 && (
                <div className="item-image">
                  <img src={item.images[0]} alt={`Image for ${item.title}`} />
                </div>
              )} */}
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-buttons">
        <button className="cart-button" onClick={handleShare}>
          <img src='./shareImg.png' alt="Print" className="button-icon" />
        </button>
        <button className="cart-button" onClick={handlePrint}>
          <img src='./printImg.png' alt="Share" className="button-icon" />
        </button>
      </div>
    </div>
  );
}

export default CartItemList;
