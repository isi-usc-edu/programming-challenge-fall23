import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline'

import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@mui/material/styles'

import Stack from '@mui/material/Stack'

import Loading from './components/Loading'
import LoginPage from './components/LoginPage'
import ShoppingListPage from './components/ShoppingListPage'
import CartListPage from './components/CartListPage';



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
          width: '450px',
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
})
theme = responsiveFontSizes(theme)



const App = () => {

  const [loading, setLoading] = useState(false)
  // const [products, setProducts] = useState([]);

  const onLogin = (username) => {
    console.log("User has logged in:", username);

    // 构建请求参数
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: "mor_2314",
        password: "83r5^_" // 这里可以是用户输入的密码
      })
    };

    // 发起登录请求
    fetch('https://fakestoreapi.com/auth/login', requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("Login successful:", data);
      })
      .catch(error => {
        console.error('Login failed:', error);
      });
  };


  useEffect(() => {
    // show a loading indicator
    setLoading(true)

    setTimeout(() => {

      // hide loading indicator
      setLoading(false)
    }, 1000) // 1 second

    // hide loading indicator
    return () => {
      setLoading(false)
    }
  }, [])

  const renderLoading = () => {
    if (!loading) { return }
    return <Loading text='loading..' />
  }

  const renderContent = () => {
    if (loading) { return }
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage onLogin={onLogin} />} />
          <Route path="/shopping-list" element={<ShoppingListPage/>} />
          <Route path="/cart-list" element={<CartListPage/>} />
        </Routes>
      </Router>
    )

  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack spacing={2}>
        {renderLoading()}
        {renderContent()}
      </Stack>
    </ThemeProvider>

  )
}

export default App
