import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";
import SuccessPopup from "../SuccessPopup";
import chips from "../itemimage/chips.png";
import defaultImage from "./itemimage/chips.png";
import cookies from "../itemimage/cookies.png";
import coke from "../itemimage/coke.png";
import popcorn from "../itemimage/popcorn.png";
import lemonade from "../itemimage/lemonade.png";
import laundry from "../itemimage/laundry.png";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

export default function CartPage() {
  const [allItems, setAllItems] = useState([]);
  const [message, setMessage] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [listening, setListening] = useState(false);
  const [recognizedItems, setRecognizedItems] = useState([]);
  const [searchType, setSearchType] = useState("none");
  const [searched, setSearched] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const itemImages = {
    chips: chips,
    cookies: cookies,
    coke: coke,
    popcorn: popcorn,
    lemonade: lemonade,
    laundry_detergent: laundry,
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("//localhost:8000/showitems");
        setAllItems(resp.data.show_items);
      } catch (error) {
        console.log("Error fetching items:", error);
      }
    })();
  }, []);

  const addItemToCart = async (itemid) => {
    try {
      await httpClient.post("//localhost:8000/addcart", { itemid });
      setShowSuccessPopup(true);
    } catch (error) {
      console.log("Error adding item to cart:", error);
      setErrorMessage("Please log in first"); 
    }
  };

  const handleSearch = () => {
    const searchTermLower = searchTerm.toLowerCase();
    const searchTerms = searchTermLower.split(" ");
    const matchingItems = [];

    searchTerms.forEach((term) => {
      const filtered = allItems.filter((item) =>
        item.itemname.toLowerCase().includes(term)
      );
      matchingItems.push(...filtered);
    });

    const uniqueMatchingItems = Array.from(new Set(matchingItems));
    setFilteredItems(uniqueMatchingItems);
    setSearched(true);
  };

  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;

    recognition.onstart = () => {
      setListening(true);
      setMessage("Listening...");
    };

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      const terms = result.toLowerCase().split(/and|,|\s+/).filter(Boolean);
      setSearchTerm(terms.join(" "));
      setSearchType("voice");
      setListening(false);
      setMessage("Voice recognition completed.");
      setSearched(true);
    };

    recognition.onerror = (event) => {
      console.error("Voice recognition error:", event.error);
      setListening(false);
      setMessage("Voice recognition error.");
    };

    recognition.start();
  };

  return (
    <div>
      {showSuccessPopup && <SuccessPopup onClose={() => setShowSuccessPopup(false)} />}
      <Typography variant="h3" gutterBottom>
        Shopping Items
      </Typography>
      <div>
        <TextField
          variant="outlined"
          placeholder="Search by item name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        /> | <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button> | <Button variant="contained" color="primary" onClick={startListening} disabled={listening}>
          {listening ? "Listening..." : "Recording..."}
        </Button>
      </div>
      {searched ? (
        <Grid container spacing={2}>
          {filteredItems.map((item) => (
            <Grid item xs={4} key={item.itemid}>
              <Card>
                <CardMedia
                  component="img"
                  alt={item.itemname}
                  height="500"
                  image={itemImages[item.itemname] || defaultImage}
                />
                <CardContent>
                  <Typography variant="h4">{item.itemname}</Typography>
                  <Typography variant="subtitle1">Price: ${item.price}</Typography>
                  <Typography variant="body1">Description: {item.description}</Typography>
                  <Typography variant="body1">Stock: {item.stock ? "Available" : "Out of stock"}</Typography>
                  <Typography variant="body1">Alternative: {item.alternative}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addItemToCart(item.itemid)}
                  >
                    {errorMessage && (
                      <Typography variant="body1" color="error">
                        {errorMessage}
                      </Typography>
                    )}
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {allItems.map((item) => (
            <Grid item xs={4} key={item.itemid}>
              <Card>
                <CardMedia
                  component="img"
                  alt={item.itemname}
                  height="500"
                  image={itemImages[item.itemname] || defaultImage}
                />
                <CardContent>
                  <Typography variant="h4">{item.itemname}</Typography>
                  <Typography variant="subtitle1">Price: ${item.price}</Typography>
                  <Typography variant="body1">Description: {item.description}</Typography>
                  <Typography variant="body1">Stock: {item.stock ? "Available" : "Out of stock"}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addItemToCart(item.itemid)}
                  >
                    {errorMessage && (
                      <Typography variant="body1" color="error">
                        {errorMessage}
                      </Typography>
                    )}
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {recognizedItems.length > 0 && searchType === "voice" && (
        <div>
          <Typography variant="h3">Recognized Items:</Typography>
          <Grid container spacing={2}>
            {recognizedItems.map((recognizedItem, index) => {
              const matchingItem = allItems.find(
                (item) =>
                  item.itemname.toLowerCase() === recognizedItem.toLowerCase()
              );
              return (
                <Grid item xs={4} key={index}>
                  <Card>
                    {matchingItem ? (
                      <>
                        <CardMedia
                          component="img"
                          alt={matchingItem.itemname}
                          height="500"
                          image={itemImages[matchingItem.itemname] || defaultImage}
                        />
                        <CardContent>
                          <Typography variant="h4">{matchingItem.itemname}</Typography>
                          <Typography variant="subtitle1">Price: ${matchingItem.price}</Typography>
                          <Typography variant="body1">Description: {matchingItem.description}</Typography>
                          <Typography variant="body1">Stock: {matchingItem.stock ? "Available" : "Out of stock"}</Typography>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => addItemToCart(matchingItem.itemid)}
                          >
                            Add to Cart
                          </Button>
                          {errorMessage && (
                            <Typography variant="body1" color="error">
                              {errorMessage}
                            </Typography>
                          )}
                        </CardContent>
                      </>
                    ) : (
                      <CardContent>
                        <Typography variant="body1">
                          No matching item found for {recognizedItem}
                        </Typography>
                      </CardContent>
                    )}
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </div>
      )}
    </div>
  );
}
