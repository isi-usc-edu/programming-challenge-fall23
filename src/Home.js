import React, { useState, useEffect } from 'react';
import './App.css';
import Appbar from './components/AppBar/AppBar';
import CardComponent from './components/CardComponent/CardComponent';
import { TextField, Button } from '@mui/material'; // Update imports
import Login from './components/Login/Login';
import VoiceSynthesizer from './components/VoiceSynthesizer/voiceSynthesizer';
import { Grid, Card, CardContent, createTheme } from '@mui/material'; // Update imports
import { dummyProducts } from './dummyProducts';

const theme = createTheme();

function Home() {
  const inputStyle = {
    marginBottom: theme.spacing(2),
    width: '100%',
  };

  const errorStyle = {
    color: 'red',
  };

  const horizontalSpaceStyle = {
    marginLeft: 10,
    width: '300px',
    padding: '10px',
  };

  const micBtnStyle = {
    margin: 5,
  };



  const [input, setInput] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleUserLogin = (name) => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    // Fetch products from API
    fetch('https://fakestoreapi.com/products?limit=5')
      .then((response) => response.json())
      .then((data) => {
        // Transform and set API products
        const apiProducts = data.map((item) => ({
          id: item.id,
          product: item.title.length > 15 ? item.title.slice(0, 25) + '...' : item.title,
          description: item.description.length > 30 ? item.description.slice(0, 30) + '...' : item.description,
          category: item.category,
          image: `https://source.unsplash.com/random/200x200?sig=${Math.random()}`,
          price: item.price,
          instock: item.rating.count,
          rating: item.rating.rate,
        }));

        const allProducts = [...dummyProducts, ...apiProducts];

        setProducts([...dummyProducts]);
      });
  }, []);

 
  const createProduct = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();

    if (trimmedInput === '') {
      setError('Please enter a valid product.');
      return;
    }

    if (products.some((product) => product.product === trimmedInput)) {
      setError('Item already exists.');
      return;
    }

    
    setProducts([
      {
        id: products.length + 1,
        product: trimmedInput,
        description: '',
        category: '',
        image: products.image ? products.image : `https://source.unsplash.com/random/200x200?sig=${Math.random()}`,
        price: 0,
        instock: 0,
        rating: 0,
      },
      ...products,
    ]);

    setInput('');
    setError('');
  };

  return (
    <div className="App">
      <Appbar
        products={products}
        isLoggedIn={isLoggedIn}
        onLogin={() => setIsLoggedIn(true)}
        onLogout={() => setIsLoggedIn(false)}
      />

      {isLoggedIn ? (
        <div>
          <div style={{marginLeft: '30%', marginTop: '30px'}}>
            <Grid container spacing={3} justify="center" className="App__grid">
                <Grid item xs={8} sm={8} md={4} lg={4}>
                <TextField
                    label="Create item"
                    variant="outlined"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={horizontalSpaceStyle}
                />

                <VoiceSynthesizer
                    onVoiceInput={(voiceInput) => setInput(voiceInput)}
                />
                <p style={errorStyle} className="error-message">
                    {error}
                </p>
                <Button
                    disabled={!input}
                    type="submit"
                    variant="contained"
                    style={micBtnStyle}
                    onClick={createProduct}
                >
                    SAVE
                </Button>
                </Grid>
            </Grid>
          </div>
          <Grid container spacing={3} justify="center" className="App__grid">
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={product.id}>
                <Card>
                  <CardContent>
                    <CardComponent product={product} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
        <Login onLogin={handleUserLogin} />
      )}
    </div>
  );
}

export default Home;
