import React, { useState } from 'react';
import { Button, TextField, Grid, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    onLogin(username);
    navigate('/shopping-list');
  };

  return (
    <div style={{ 
      backgroundImage: 'url(/flat-lay-vegetables-fruits-arrangement.jpg)', // 正确引用图片
      backgroundSize: 'cover', 
      display: 'flex', 
      height: '100vh', 
      width: '100vw', 
      alignItems: 'center', 
      justifyContent: 'center', 
      flexDirection: 'column' }}>
      <Container style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '30vh'
      }}>
        <Typography
          component="h1"
          variant="h2"
          style={{
            fontFamily: "'Dancing Script', cursive",
            color: '#DAA540'
          }}
        >
          Welcome to Grocery Management
        </Typography>
      </Container>
      <Container component="main" maxWidth="xs" >


        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleLogin}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>

  );
};

export default LoginPage;
