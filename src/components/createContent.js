const createEmailContent = (apiData) => {
    // const { items } = apiData; // Extract items from apiData
  
    // Calculate the total price
    const totalPrice = Object.values(apiData).reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  
    // Create the email content
    const emailContent = `
    <div>
      <h2>Your Shopping Cart</h2>
      <ul>
        ${Object.values(apiData)
          .map(
            (item) => `
          <li>
            <strong>${item.brand} - ${item.title}</strong>
            <br />
            Quantity: ${item.quantity}
            <br />
            Price per item: $${item.price}
          </li>
        `
          )
          .join('')}
      </ul>
      <p>Total Price: $${totalPrice.toFixed(2)}</p>
    </div>`;
  
    return emailContent;
  };
  
  export default createEmailContent;
  