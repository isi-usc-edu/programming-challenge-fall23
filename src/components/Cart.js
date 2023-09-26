import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  AppBar,
  Toolbar,
  Badge,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailInputModal from './EmailModal';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import sendmail from './sendEmail';
import createEmailContent from './createContent';
const Cart = () => {
    const [apiData, setApiData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [recipientEmail, setRecipientEmail] = useState('');
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const username  = sessionStorage.username;
    useEffect(() => {
        const username  = sessionStorage.username;
        var data = sessionStorage.getItem(username);
        if (data) {
          const userData = JSON.parse(data);
          setApiData(userData);
        }
      }, []);
  const getTotalPrice = () => {
    var total = 0
    Object.entries(apiData['items']).forEach(([key, value]) => {
        total += (value.quantity * value.price);
      });
    return total;
  };
  const handleMail = () => {
    setModalOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const sendEmail = (recipientEmail) => {
    // Customize this function to send the email using your email service or API
    // Example: You can make an HTTP request to your backend to send the email
    // or use a client library for sending emails.
    // Ensure you have configured your email service properly.
    console.log(`Sending email to: ${recipientEmail}`);
    setOpen(true);
    var content = createEmailContent(apiData['items'])
    // ... (send email logic)
    sendmail(username,recipientEmail, content);
    // Close the modal and show a confirmation message
    setModalOpen(false);
    setMessage('Email sent successfully');
  };
  const navigate = useNavigate();
  const gohome=()=>{
    
    navigate('/dashboard');
  }
  return (
    apiData ?
    <div>
    <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" style={{ flexGrow: 1 }} textAlign={'right'} sx={{m:1}}>
        Welcome {username} !!!
      </Typography>
      <IconButton color="inherit">
        <Badge color="error" size="large" >
          <HomeIcon onClick={gohome}/>
        </Badge>
      </IconButton>
    </Toolbar>
  </AppBar>
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Shopping Cart
      </Typography>
      {apiData['count'] === 0 ? (
        <Typography variant="h6" align="center">
          Your cart is empty.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="Cart Table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Total</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(apiData['items']).map(([key, item]) =>(
                <TableRow key={item.id}>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img src={item.thumbnail} alt={item.brand} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
                      <span>{item.brand} - {item.title}</span>
                    </div>
                  </TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="center">${item.price}</TableCell>
                  <TableCell align="center">${item.price * item.quantity}</TableCell>
                  {/* <TableCell>{item}</TableCell> */}
                  <TableCell align="center">
                    <IconButton aria-label="delete" color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
         )}
       {apiData['count'] === 0 ? (
        <div></div>): (
            <div>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
        <Typography variant="h6">
          Total: ${getTotalPrice()}
        </Typography>
      </div>
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" onClick={handleMail}>
          Share the Cart
        </Button>
      </div>
      </div>
       )}
      <EmailInputModal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      onConfirm={sendEmail}
    />
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
    <MuiAlert onClose={handleClose} severity="success" sx={{ width: '100%' }}> Email Sent successfully</MuiAlert></Snackbar>
    </Container>
    </div>: <div></div>
  );
};

export default Cart;
