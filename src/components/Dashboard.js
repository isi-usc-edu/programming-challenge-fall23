import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
  Badge,
  Button,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
function Dashboard() {

  const username  = sessionStorage.username;
  var data = sessionStorage.getItem(username);
  data = JSON.parse(data)
  var [itemscart,setItem] = useState(data['count']);
  const [apiData, setApiData] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);


    useEffect(() => {
    const apiUrl = 'https://dummyjson.com/products?limit=100';
    const data = sessionStorage.getItem(username);
    if (data) {
      const userData = JSON.parse(data);
      const itemCount = userData.count;
      setCartCount(itemCount);
    }
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setApiData(data);
        setFilteredProducts(data.products);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const handleSearch = () => {
    // Filter products based on the search query
    const query = searchText.toLowerCase();
    const filtered = apiData.products.filter((product) =>
      product.title.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };
  const handleClick = (index) => {
    const username = sessionStorage.username;
    const data = sessionStorage.getItem(username);
    const userData = JSON.parse(data);
    userData.count = parseInt(userData.count) + 1;
    if(index in userData['items']){
        userData['items'][index]['quantity']+=1;
    }
    else{
    userData['items'][index] = apiData.products[index];
    userData['items'][index]['quantity'] = 1;
    }
    sessionStorage.setItem(username, JSON.stringify(userData));

    setCartCount(userData.count);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

// console.log(apiData)

  const [searchText, setSearchText] = useState('');
  const [isListening, setIsListening] = useState(false);

  const recognition = new window.webkitSpeechRecognition(); // Create a speech recognition instance

  recognition.onstart = () => {
    setIsListening(true);
  };

  recognition.onend = () => {
    setIsListening(false);
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setSearchText(transcript);
    console.log('Transcribed Text:', transcript); // Log the transcribed text to the console
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleVoiceInput = () => {
    if (!isListening) {
      recognition.start(); // Start listening when the microphone button is clicked
    } else {
      recognition.stop(); // Stop listening when the button is clicked again
    }
  };
  const navigate = useNavigate();
  const handleCart = () => {
    navigate('/cart');
  }
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }} textAlign={'right'} sx={{m:1}}>
            Welcome {username} !!!
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={cartCount} color="error" size="large" >
              <ShoppingCartIcon onClick={handleCart}/>
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container>
        <div style={{ display: 'flex', marginTop: '20px' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search..."
            value={searchText}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleVoiceInput}>
                    {isListening ? <MicIcon color="primary" /> : <MicIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }} sx={{mr:1}}
          />
          <Button variant="contained" startIcon={<SearchIcon />} color="primary" onClick={handleSearch}>
            Search
          </Button>
        </div>       
        {apiData ? (
          <Grid container spacing={3} sx={{ mt: 3 }}>
            {filteredProducts.map((project, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    alt="Product"
                    src={project.thumbnail}
                  />
                  <CardContent>
                    <Typography variant="subtitle1">
                      {project.brand} : {project.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: 12 }}
                    >
                      {project.description.substring(0, 80)}..
                    </Typography>
                    <Typography variant="h6">${project.price}</Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleClick(index)}
                    >
                      Add to Cart
                    </Button>
                    <Snackbar
                      open={open}
                      autoHideDuration={3000}
                      onClose={handleClose}
                    >
                      <MuiAlert
                        onClose={handleClose}
                        severity="success"
                        sx={{ width: '100%' }}
                      >
                        Added Item to Cart
                      </MuiAlert>
                    </Snackbar>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : <></>}
      </Container>
    </div>
  );
}

export default Dashboard;
