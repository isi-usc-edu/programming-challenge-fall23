import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/login";

import CssBaseline from "@mui/material/CssBaseline";

import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";

import Stack from "@mui/material/Stack";

import Content from "./components/Content";
import Loading from "./components/Loading";
import ShoppingList from "./pages/shoppingList";

let theme = createTheme({
  palette: {
    primary: {
      main: "#de6720",
    },
    secondary: {
      main: "#0077ea",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          WebkitFontSmoothing: "auto",
        },
        body: {
          background: "#fefefe",
          overflow: "hidden",
          padding: "5px",
          width: "100vw",
          height: "100vh",
          color: "#333",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(222, 103, 32, 0.25)",
        },
        bar: {
          backgroundColor: "rgba(222, 103, 32, 1)",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#f5f5f5",
          fontWeight: "600",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: "1.2rem",
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          minWidth: "80vw",
          minHeight: "50vh",
        },
      },
    },
  },
});
theme = responsiveFontSizes(theme);

const router = createBrowserRouter([
  {
    path: "/",
    element: <ShoppingList />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
