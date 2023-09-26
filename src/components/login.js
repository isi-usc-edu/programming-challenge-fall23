import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Avatar,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
const useStyles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: 'url(https://www.ninahendrick.com/wp-content/uploads/Small-Pantry-Organization-9.jpg)', // Replace with your image URL
    backgroundSize: 'cover', // Adjust background size as needed
    backgroundPosition: 'center', // Adjust background position as needed
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
    width: '400px',
    backgroundColor: 'rgba(255, 255, 255, 1)', // Add a semi-transparent background color
  },
  avatar: {
    backgroundColor: 'primary',
    marginBottom: '8px',
  },
  form: {
    width: '100%',
    marginTop: '8px',
  },
  submitButton: {
    marginTop: '16px',
  },
};

function Login() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log(`Logged in as ${username}`);
    if(!sessionStorage.getItem(username)){
    sessionStorage.setItem(username,JSON.stringify({'items':{},'count':0}));
    }
    sessionStorage.setItem('username',username);
    navigate('/dashboard');
  };

  return (
    <div style={useStyles.root}>
      <Paper elevation={3} style={useStyles.paper}>
        <Avatar style={useStyles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" gutterBottom>
          Log In
        </Typography>
        <form style={useStyles.form} onSubmit={handleLogin}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={useStyles.submitButton}
          >
            Log In
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default Login;
