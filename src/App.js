import React, { useEffect, useState } from 'react'

import CssBaseline from '@mui/material/CssBaseline'

import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@mui/material/styles'

import Stack from '@mui/material/Stack'

import Content from './components/Content'
import Loading from './components/Loading'
import Login from './pages/login'
import ShoppingListApp from './pages/shopping-list'

import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';

 

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
          padding: '5px',
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
    if ( !loading ) { return }
    return <Loading text='loading..' />
  }

  const renderContent = () => {
    if ( loading ) { return }
    return <Content />
  }

  return (
    // <Router>
    <ThemeProvider theme={theme}>
      {/* <CssBaseline />
      <Stack spacing={2}>
        {renderLoading()}
        {renderContent()}
      </Stack> */}
      {/* <Login /> */}
      {/* <Router> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/shopping-list" element={<ShoppingListApp />} />
        {/* <Route path="/login" element={Login} /> */}
      </Routes>
    {/* </Router> */}
    </ThemeProvider>
  )
}

export default App
