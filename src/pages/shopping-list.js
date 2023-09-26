import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import { AddCircle, Delete } from '@mui/icons-material';
import SpeechRecognitionComponent from '../components/SpeechRecognition';

const ShoppingListApp = () => {
  const [storeItems, setStoreItems] = useState([
    { id: 1, name: 'Apples', price: 1.99 },
    { id: 2, name: 'Bananas', price: 0.99 },
    { id: 3, name: 'Milk', price: 2.49 },
    { id: 3, name: 'Oranges', price: 2.49 },
    { id: 3, name: 'Cucumber', price: 2.49 },
    // Add more store items as needed
  ]);
  const [userItems, setUserItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  const addItemToUserList = (item) => {
    setUserItems([...userItems, item]);
  };

  const removeItemFromUserList = (index) => {
    const updatedItems = [...userItems];
    updatedItems.splice(index, 1);
    setUserItems(updatedItems);
  };

  const printItems = () => {
    
    var products = [
        { name: "Product 1", price: "$10.00" },
        { name: "Product 2", price: "$20.00" },
        { name: "Product 3", price: "$15.00" },
        { name: "Product 4", price: "$25.00" },
    ];


    const tableToPrint = document.createElement('table')
    tableToPrint.createTBody()
    tableToPrint.style.borderCollapse = "collapse";
    tableToPrint.style.width = "50%";
    tableToPrint.style.margin = "0 auto";
    tableToPrint.style.border = "1px solid #ddd";
    tableToPrint.style.outline = "1px solid #ddd";

    var thead = tableToPrint.createTHead();
        var headerRow = thead.insertRow();
        var th1 = document.createElement("th");
        th1.textContent = "Name";
        th1.style.border = "1px solid #ddd"; // Add a border to the header cells
        th1.style.outline = "1px solid #ddd"; // Add an outline to the header cells
        var th2 = document.createElement("th");
        th2.textContent = "Price";
        th2.style.border = "1px solid #ddd"; // Add a border to the header cells
        th2.style.outline = "1px solid #ddd"; // Add an outline to the header cells
        headerRow.appendChild(th1);
        headerRow.appendChild(th2);

    var tableBody = tableToPrint.getElementsByTagName('tbody')[0]

        // Loop through the products and add rows to the table
        for (var i = 0; i < products.length; i++) {
            var row = tableBody.insertRow(i);
            row.style.border = "1px solid #ddd"; // Add a border to the row
            row.style.outline = "1px solid #ddd";

            var cell1 = row.insertCell(0);
            cell1.textContent = products[i].name;
            cell1.style.border = "1px solid #ddd";
            cell1.style.outline = "1px solid #ddd";
            cell1.style.textAlign = "center";

            var cell2 = row.insertCell(1);
            cell1.innerHTML = products[i].name;
            cell2.innerHTML = products[i].price;
            

            cell2.textContent = products[i].price;
            cell2.style.border = "1px solid #ddd";
            cell2.style.outline = "1px solid #ddd";
            cell2.style.textAlign = "center";
        }

    let newWin= window.open("");
    newWin.document.write(tableToPrint.outerHTML);
    newWin.print();
    newWin.close();
  }

  const sendEmail = ( subject, body ) => {
    // Encode the subject and body to ensure special characters are properly handled
    const encodedSubject = encodeURIComponent(`Hi, I'm sharing my shopping list with you!`);

    var products = [
        { name: "Product 1", price: "$10.00" },
        { name: "Product 2", price: "$20.00" },
        { name: "Product 3", price: "$15.00" },
        { name: "Product 4", price: "$25.00" },
    ];


    const tableToPrint = document.createElement('table')
    tableToPrint.createTBody()
    tableToPrint.style.borderCollapse = "collapse";
    tableToPrint.style.width = "50%";
    tableToPrint.style.margin = "0 auto";
    tableToPrint.style.border = "1px solid #ddd";
    tableToPrint.style.outline = "1px solid #ddd";

    var thead = tableToPrint.createTHead();
        var headerRow = thead.insertRow();
        var th1 = document.createElement("th");
        th1.textContent = "Name";
        th1.style.border = "1px solid #ddd"; // Add a border to the header cells
        th1.style.outline = "1px solid #ddd"; // Add an outline to the header cells
        var th2 = document.createElement("th");
        th2.textContent = "Price";
        th2.style.border = "1px solid #ddd"; // Add a border to the header cells
        th2.style.outline = "1px solid #ddd"; // Add an outline to the header cells
        headerRow.appendChild(th1);
        headerRow.appendChild(th2);

    var tableBody = tableToPrint.getElementsByTagName('tbody')[0]

        // Loop through the products and add rows to the table
        for (var i = 0; i < products.length; i++) {
            var row = tableBody.insertRow(i);
            row.style.border = "1px solid #ddd"; // Add a border to the row
            row.style.outline = "1px solid #ddd";

            var cell1 = row.insertCell(0);
            cell1.textContent = products[i].name;
            cell1.style.border = "1px solid #ddd";
            cell1.style.outline = "1px solid #ddd";
            cell1.style.textAlign = "center";

            var cell2 = row.insertCell(1);
            cell1.innerHTML = products[i].name;
            cell2.innerHTML = products[i].price;
            

            cell2.textContent = products[i].price;
            cell2.style.border = "1px solid #ddd";
            cell2.style.outline = "1px solid #ddd";
            cell2.style.textAlign = "center";
        }

    let htmlBod = document.createElement('html')
    
    const encodedBody = encodeURIComponent(tableToPrint.outerHTML);
  
    // Create the mailto URL with subject and body
    const mailtoUrl = `mailto:?subject=${encodedSubject}&body=${encodedBody}`;
    window.location.href = mailtoUrl;
  };
  

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Shopping List
      </Typography>

      {/* Store Catalog */}
      <Typography variant="h5" gutterBottom>
        Store Catalog
      </Typography>
      <List>
        {storeItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={item.name}
              secondary={`$${item.price.toFixed(2)}`}
            />
            <ListItemSecondaryAction>
              <Button
                variant="contained"
                color="primary"
                onClick={() => addItemToUserList(item)}
              >
                Add to List
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {/* User's Shopping List */}
      <Typography variant="h5" gutterBottom>
        Your Shopping List
      </Typography>
      <TextField
        label="Add Item"
        variant="outlined"
        fullWidth
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            addItemToUserList({ name: newItem, price: 0 });
            setNewItem('');
          }
        }}
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircle />}
        onClick={() => {
          if (newItem.trim() !== '') {
            addItemToUserList({ name: newItem, price: 0 });
            setNewItem('');
          }
        }}
        fullWidth
      >
        Add
      </Button>
      <SpeechRecognitionComponent originalList={storeItems.map(item => {return item.name})} addItems = {(items) => {
        setUserItems([...userItems, ...items.map(i => {return {name: i, price: 0}})])
      }} />
      <List>
        {userItems.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item.name} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => removeItemFromUserList(index)}
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Button onClick={printItems} variant="contained" color="primary" fullWidth>
        Print List
      </Button>
      <Button onClick={() => {sendEmail('SUBHE', 'BODY')}} variant="contained" color="primary" fullWidth>
        Share List
      </Button>
      {/* <Button variant="contained" color="primary" fullWidth>
        Send to Store
      </Button> */}
    </Container>
  );
};

export default ShoppingListApp;