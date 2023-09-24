import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from 'react-router-dom';
import './Action.css'; // Import your CSS file for styling

function Actions({ todos }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEmailSent(false); // Reset emailSent state
    setRecipientEmail(''); // Clear recipient email input
  };

  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleSendEmail = () => {
    const todoText = todos.map((todo) => todo.todo).join('\n');

    // Create a text area element and set its value to the todoText
    const textArea = document.createElement('textarea');
    textArea.value = todoText;

    // Append the text area element to the document body and select its contents
    document.body.appendChild(textArea);
    textArea.select();

    // Copy the selected text to the clipboard
    document.execCommand('copy');

    // Remove the text area element from the document
    document.body.removeChild(textArea);

    setEmailSent(true); // Set emailSent to true
    setOpenDialog(false); // Close the dialog
  };

  return (
    <div>
      <IconButton edge="end" color="inherit" aria-label="print" onClick={handlePrint}>
        <PrintIcon />
      </IconButton>

      <IconButton edge="end" color="inherit" aria-label="cart" onClick={handleCartClick}>
        <AddShoppingCartIcon />
        <span
          style={{
            position: 'absolute',
            top: '-1px',
            right: '1px',
            backgroundColor: 'white',
            borderRadius: '50%',
            padding: '5px',
            color: 'red',
            fontSize: '10px',
            fontWeight: 'bold',
          }}
        >
          {todos.length}
        </span>
      </IconButton>

      <IconButton edge="end" color="inherit" aria-label="share" onClick={handleShare}>
        <ShareIcon />
      </IconButton>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        className={openDialog ? 'blur-background' : ''}
        PaperProps={{
          style: {
            width: '30%', // Adjust the width as needed
            maxWidth: 'none', // Allow the dialog to expand beyond the screen width
          },
        }}
      >
        <DialogTitle style={{ backgroundColor: '#1976d2', color: 'white', marginBottom:'10px' }}>Share via Email</DialogTitle>
        <DialogContent>
          <TextField
            label="Recipient's Email"
            fullWidth
            variant="outlined"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSendEmail} color="primary" disabled={!recipientEmail || emailSent}>
            {emailSent ? 'Email Sent' : 'Send Email'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Actions;
