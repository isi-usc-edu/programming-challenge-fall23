import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

function ManageAccount({ userEmail, onDeleteAccount, onClose }) {
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Manage Account</DialogTitle>
      <DialogContent>
        <p>User Email: {userEmail}</p>
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
  );
}

export default ManageAccount;
