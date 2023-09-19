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

const ShoppingListApp = () => {
  const [storeItems, setStoreItems] = useState([
    { id: 1, name: 'Apples', price: 1.99 },
    { id: 2, name: 'Bananas', price: 0.99 },
    { id: 3, name: 'Milk', price: 2.49 },
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

      <Button variant="contained" color="primary" fullWidth>
        Print List
      </Button>
      <Button variant="contained" color="primary" fullWidth>
        Share List
      </Button>
      <Button variant="contained" color="primary" fullWidth>
        Send to Store
      </Button>
    </Container>
  );
};

export default ShoppingListApp;