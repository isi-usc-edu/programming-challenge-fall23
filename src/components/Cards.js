import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function ProductCard(projectsData) {
  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Load cart count from session storage when the component mounts
    const data = sessionStorage.getItem('userdata');
    if (data) {
      const userData = JSON.parse(data);
      const itemCount = userData.cart.count;
      setCartCount(itemCount);
    }
  }, []);

  const handleClick = (index) => {
    const data = sessionStorage.getItem('userdata');
    const username = sessionStorage.username;
    const userData = JSON.parse(data);

    userData.cart.count = parseInt(userData.cart.count) + 1;
    userData.cart.items.push(projectsData.projectsData.products[index]);
    sessionStorage.setItem('userdata', JSON.stringify(userData));

    setCartCount(userData.cart.count);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
          // You can navigate to the cart page or perform any other action here
        }}
      >
        Cart ({cartCount} items)
      </Button>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {projectsData.projectsData.products.map((project, index) => (
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
    </div>
  );
}

export default ProductCard;
