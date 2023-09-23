import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Typography, Popover, Box } from '@mui/material';

function ShoppingList() {
  const initialItems = [
    {
      id: 1,
      title: 'Apples',
      price: 2.99,
      image: 'apple.jpg', // Replace with actual image URL
      quantity: 3,
    },
    {
      id: 2,
      title: 'Bananas',
      price: 1.99,
      image: 'banana.jpg', // Replace with actual image URL
      quantity: 2,
    },
    // Add more items here
  ];

  const [anchorEl, setAnchorEl] = useState(null);
  const [items, setItems] = useState(initialItems);
  const [newItem, setNewItem] = useState({
    title: '',
    price: '',
    image: '',
    quantity: '',
  });

  const addItem = () => {
    if (
      newItem.title.trim() === '' ||
      newItem.price.trim() === '' ||
      newItem.quantity.trim() === ''
    ) {
      return;
    }

    const newItemWithId = {
      ...newItem,
      id: Date.now(),
      price: parseFloat(newItem.price),
      quantity: parseInt(newItem.quantity),
    };

    setItems([...items, newItemWithId]);
    setNewItem({
      title: '',
      price: '',
      image: '',
      quantity: '',
    });
  };

  const removeItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };


  const openPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closePopover = () => {
    setAnchorEl(null);
  };

  const isPopoverOpen = Boolean(anchorEl);

  return (
    <div style={{ textAlign: 'center', backgroundColor: '#e6f7ed', padding: '20px', height: '100vh' }}>
      <Typography variant="h4">Shopping List</Typography>
      <Button
          variant="contained"
          color="primary"
          onClick={openPopover}
        //   startIcon={<AddCircleOutlineIcon />}
        >
          Add Item
        </Button>
        <Popover
          open={isPopoverOpen}
          anchorEl={anchorEl}
          onClose={closePopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Box p={2}>
            <TextField
              type="text"
              label="Item Title"
              variant="outlined"
              fullWidth
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            />
            <TextField
              type="number"
              label="Price ($)"
              variant="outlined"
              fullWidth
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            />
            <TextField
              type="text"
              label="Image URL"
              variant="outlined"
              fullWidth
              value={newItem.image}
              onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
            />
            <TextField
              type="number"
              label="Quantity"
              variant="outlined"
              fullWidth
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={addItem}
            >
              Add Item
            </Button>
          </Box>
        </Popover>
      <TableContainer component={Paper} style={{ marginTop: '20px', fontSize:'2rem' }} >
        <Table>
          <TableHead >
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
                <TableCell>
                  <img src={item.image} alt={item.title} width="80" height="80" />
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => removeItem(item.id)}>Remove</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ShoppingList;
