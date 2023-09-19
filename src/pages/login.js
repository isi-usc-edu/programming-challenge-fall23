import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

const Login = () => {
  const [name, setName] = useState('');

  const handleLogin = () => {
    // Add login logic here
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
        >
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;