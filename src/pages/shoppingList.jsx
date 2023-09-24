import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  Popover,
  Box,
} from "@mui/material";
import { ProductsAPI } from "../api/products";
import { initializeSpeech, startRecognition } from "../utils/speechRecognition";

function ShoppingList() {
  const initialItems = [
    {
      id: -1,
      title: "Apples",
      price: 2.99,
      thumbnail: "apple.jpg", 
      quantity: 3,
    },
    {
      id: 2,
      title: "Bananas",
      price: 1.99,
      thumbnail: "banana.jpg", 
      quantity: 2,
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [items, setItems] = useState(initialItems);
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  const searchItems = async () => {
    const res = await ProductsAPI.searchProducts(searchTerm);
    const products = res.products.map((product) => ({
      ...product,
      quantity: 1,
    }));
    setResults(products);
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

  const startSpeechRecognition = () => {
    const speechSearch = (term) => {
      setSearchTerm(term);
      searchItems();
    };

    const toggleListening = () => {
      setListening((listening) => !listening);
    };

    const recognition = initializeSpeech();
    setRecognition(recognition);
    startRecognition(
      recognition,
      toggleListening,
      speechSearch,
      toggleListening
    );
  };

  const stopSpeechRecognition = () => {
    recognition.stop();
    setRecognition(null);
    setListening(false);
  };

  const isPopoverOpen = Boolean(anchorEl);

  const downloadList = () => {
    const element = document.createElement("a");

    const text =
      "Shopping List: \n Item \t Price \t Quantity \t Total\n" +
      items.map(
        (item) =>
          `${item.title.padEnd(' ', 20)} \t  $${item.price.toFixed(2)} \t  ${
            item.quantity
          } \t $${(item.price * item.quantity).toFixed(2)}`
      ).join("\n");
		
		console.log(text);

    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", "ShoppingList.txt");

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  const ItemsPopover = (
    <Popover
      open={isPopoverOpen}
      anchorEl={anchorEl}
      onClose={closePopover}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Box p={2}>
        <Box width={"100%"} display={"flex"} justifyContent={"space-between"}>
          <Button
            variant="contained"
            color={listening ? "secondary" : "primary"}
            onClick={listening ? stopSpeechRecognition : startSpeechRecognition}
          >
            {listening ? "Stop Listening" : "Start Listening"}
          </Button>
          <TextField
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "50%" }}
          />
          <Button variant="contained" color="primary" onClick={searchItems}>
            Search
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setSearchTerm("")}
          >
            Clear
          </Button>
        </Box>
        <TableContainer
          component={Paper}
          style={{ marginTop: "20px", fontSize: "2rem" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      width="80"
                      height="80"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      label="Quantity"
                      variant="outlined"
                      value={item.quantity}
                      type="number"
                      onChange={(e) => {
                        const updatedItem = {
                          ...item,
                          quantity: e.target.value,
                        };
                        const updatedResults = results.map((result) =>
                          result.id === item.id ? updatedItem : result
                        );
                        setResults(updatedResults);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        if (item.quantity < 1) return;
                        setItems([...items, item]);
                        setResults([]);
                        setSearchTerm("");
                        closePopover();
                      }}
                    >
                      Add
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Popover>
  );

  const ShoppingTable = (
    <TableContainer
      component={Paper}
      style={{ marginTop: "20px", fontSize: "2rem" }}
    >
      <Table>
        <TableHead>
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
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  width="80"
                  height="80"
                />
              </TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <div
      style={{
        textAlign: "center",
        backgroundColor: "#e6f7ed",
        padding: "20px",
        height: "100vh",
      }}
    >
      <Typography variant="h4">Shopping List</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={openPopover}
        //   startIcon={<AddCircleOutlineIcon />}
      >
        Add Item
      </Button>
      {ItemsPopover}
      {ShoppingTable}
      <div>
        {/* Download List Button */}
        <Button variant="contained" color="primary" onClick={downloadList}>
          Download List
        </Button>
        {/* Share Via Email */}
        <Button variant="contained" color="primary">
          Share Via Email
        </Button>
      </div>
    </div>
  );
}

export default ShoppingList;
