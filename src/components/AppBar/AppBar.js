import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import ManageAccount from '../ManageAccount/ManageAccount';
import Actions from '../Action/Action';

const theme = createTheme();

const useStyles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  test:{
    marginRight: theme.spacing(2),
    alignItems: 'right',
  }
};

function Appbar({ products, isLoggedIn, onLogin, onLogout }) {
  const [isAccountModalOpen, setAccountModalOpen] = useState(false);

  const handleLogoutClick = () => {
    onLogout(); // Call the parent component's logout function
  };

  const handleAccountManagement = () => {
    setAccountModalOpen(true);
  };

  const handleDeleteAccount = () => {
    // Clear local storage and log out
    localStorage.clear();
    handleLogoutClick();
    setAccountModalOpen(false);
  };

  const username = localStorage.getItem('username');

  return (
    <ThemeProvider theme={theme}>
      <div className={useStyles.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={useStyles.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={useStyles.title}>
              Grocery App
            </Typography>
           
            {isLoggedIn ? (
              <>
               <div style={{marginLeft: '75%'}}>
                <Button color="inherit" onClick={handleLogoutClick}>
                  Logout
                </Button>

                <Button color="inherit" onClick={handleAccountManagement}>
                  Manage Account
                </Button>
               
                </div>
                <Actions products={products}  />

                {isAccountModalOpen && (
                  <ManageAccount
                    userEmail={username} // Replace with the user's actual email
                    onDeleteAccount={handleDeleteAccount}
                    onClose={() => setAccountModalOpen(false)}
                  />
                )}
              </>
            ) : (
              <></>
            )}
            
          </Toolbar>
        </AppBar>
      </div>
    </ThemeProvider>
  );
}

export default Appbar;
