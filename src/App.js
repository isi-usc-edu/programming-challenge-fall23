import React, { useEffect, useState } from 'react';

import CssBaseline from '@mui/material/CssBaseline';

import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import GroceryList from './components/GroceryList';
import Loading from './components/Loading';
import Login from './components/Login';

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import { useTheme } from '@mui/material/styles';

import { Route, Routes, useNavigate } from 'react-router-dom';
import { ColumnFlexBox } from './helper-components';

let theme = createTheme({
  palette: {
    primary: {
      main: '#de6720',
    },
    secondary: {
      main: '#0077ea',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          WebkitFontSmoothing: 'auto',
        },
        body: {
          background: '#fefefe',
          overflow: 'hidden',
          // padding: '5px',
          // width: '450px',
          color: '#333',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(222, 103, 32, 0.25)',
        },
        bar: {
          backgroundColor: 'rgba(222, 103, 32, 1)',
        },
      },
    },
  },
});
theme = responsiveFontSizes(theme);

const HomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const handleGetStartedClick = () => navigate('/login');
  const renderHomePage = () => {
    return (
      <Box
        bgcolor={theme.palette.primary.main}
        py='20vh'
        px='30vw'
        width='100vw'
        height='100vh'
      >
        <ColumnFlexBox
          p='64px'
          borderRadius='16px'
          justifyContent='center'
          gap='64px'
          bgcolor='rgba(255, 255, 255, 0.5)'
          alignItems='center'
        >
          <Typography variant='h4'>Welcome to SHOP sMART!</Typography>
          <Button
            onClick={handleGetStartedClick}
            variant='contained'
            color='secondary'
            style={{ width: 'max-content' }}
          >
            Get started
            <ArrowRightAltIcon />
          </Button>
        </ColumnFlexBox>
      </Box>
    );
  };
  return renderHomePage();
};

const App = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // show a loading indicator
    setLoading(true);

    setTimeout(() => {
      // hide loading indicator
      setLoading(false);
    }, 1000); // 1 second

    // hide loading indicator
    return () => {
      setLoading(false);
    };
  }, []);

  // const renderLoading = () => {
  //   if (!loading) {
  //     return;
  //   }
  //   return <Loading text='loading..' />;
  // };

  // const renderContent = () => {
  //   if (loading) {
  //     return;
  //   }
  //   return <GroceryList />;
  // };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack spacing={2}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/list' element={<GroceryList />} />
        </Routes>
      </Stack>
    </ThemeProvider>
  );
};

export default App;
