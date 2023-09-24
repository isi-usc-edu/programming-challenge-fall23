import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './ManageAccount.css'; // Import your CSS file for styling

// Create a custom theme
const theme = createTheme({
  components: {
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          backgroundColor: 'blue', // Set the background color of the dialog header to blue
          color: 'white', // Set text color to white
        },
      },
    },
  },
});

function ManageAccount({ userEmail, onDeleteAccount, onClose }) {
  return (
    <ThemeProvider theme={theme}>
      <Dialog open={true} onClose={onClose} PaperProps={{ style: { width: '30%', maxWidth: 'none' } }}>
        <DialogTitle>Manage Account</DialogTitle>
        <DialogContent style={{ fontSize: '20px', padding: '16px', alignItems:'center' }}>
          <p>User Name: {userEmail}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDeleteAccount} color="error">
            Delete Account
          </Button>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default ManageAccount;
