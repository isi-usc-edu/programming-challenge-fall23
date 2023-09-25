import React from 'react';
import { Card, CardHeader, CardContent, Typography, Grid } from '@mui/material';
import CardComponent from '../CardComponent/CardComponent';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();

function Store({ products }) {
  console.log('products', products);

  return (
    <>
      hi
      {products?.products?.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={product.id}>
          <Card
            className="card"
            sx={{
              maxWidth: 400,
              margin: '16px',
              backgroundColor: '#AAB4BF',
            }}
          >
            <CardHeader title={product.product} subheader={product.category} />
            <CardContent>
              <Typography variant="body1">
                Description: {product.description}
              </Typography>
              <Typography variant="body1">Price: {product.price}</Typography>
              <Typography variant="body1">
                In Stock: {product.instock}
              </Typography>
              <Typography variant="body1">Rating: {product.rating}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </>
  );
}

export default Store;
