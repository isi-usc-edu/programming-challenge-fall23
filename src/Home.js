import React, { useState, useEffect } from 'react';
import './App.css';
import Appbar from './components/AppBar/AppBar';
import CardComponent from './components/CardComponent/CardComponent';
import { TextField, Button } from '@mui/material'; // Update imports
import Login from './components/Login/Login';
import VoiceSynthesizer from './components/VoiceSynthesizer/voiceSynthesizer';
import { Grid, Card, CardContent, createTheme } from '@mui/material'; // Update imports
import { dummyProducts } from './dummyProducts';
import Store from './components/Store/store';

const theme = createTheme();

function Home() {
  const inputStyle = {
    marginBottom: theme.spacing(2),
    width: '100%',
  };

  const errorStyle = {
    color: 'red',
  };

  const horizontalSpaceStyle = {
    marginLeft: 10,
    width: '300px',
    padding: '10px',
  };

  const micBtnStyle = {
    margin: 5,
  };

  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleUserLogin = (name) => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    // Fetch todos from API
    fetch('https://fakestoreapi.com/products?limit=5')
      .then((response) => response.json())
      .then((data) => {
        // Transform and set API todos
        const apiTodos = data.map((item) => ({
          id: item.id,
          todo: item.title.length > 15 ? item.title.slice(0, 25) + '...' : item.title,
          description: item.description.length > 30 ? item.description.slice(0, 30) + '...' : item.description,
          category: item.category,
          image: item.image,
          price: item.price,
          instock: item.rating.count,
          rating: item.rating.rate,
        }));

        // Concatenate dummy todos with API todos
        const allTodos = [...dummyProducts, ...apiTodos];

        // Set the combined todos in state
        setTodos(allTodos);
      });
  }, []);

  const [store, setStore] = useState([]);

  const createTodo = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();

    if (trimmedInput === '') {
      setError('Please enter a valid todo.');
      return;
    }

    if (todos.some((todo) => todo.todo === trimmedInput)) {
      setError('Item already exists.');
      return;
    }

    setStore([
      {
        id: todos.length + 1,
        todo: trimmedInput,
        description: '',
        category: '',
        image: todos.image ? todos.image : `https://source.unsplash.com/random/200x200?sig=${Math.random()}`,
        price: 0,
        instock: 0,
        rating: 0,
      },
      ...store,
    ]);

    setInput('');
    setError('');
  };

  return (
    <div className="App">
      <Appbar
        todos={todos}
        isLoggedIn={isLoggedIn}
        onLogin={() => setIsLoggedIn(true)}
        onLogout={() => setIsLoggedIn(false)}
      />

      {isLoggedIn ? (
        <div>
          <Grid container spacing={3} justify="center" className="App__grid">
            <Grid item xs={8} sm={8} md={4} lg={4}>
              <TextField
                label="Create item"
                variant="outlined"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={horizontalSpaceStyle}
              />

              <VoiceSynthesizer
                onVoiceInput={(voiceInput) => setInput(voiceInput)}
              />
              <p style={errorStyle} className="error-message">
                {error}
              </p>
              <Button
                disabled={!input}
                type="submit"
                variant="contained"
                style={micBtnStyle}
                onClick={createTodo}
              >
                SAVE
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={3} justify="center" className="App__grid">
            {todos.map((todo) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={todo.id}>
                <Card>
                  <CardContent>
                    <CardComponent todo={todo} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
            <Store products={store} />
          </Grid>
        </div>
      ) : (
        <Login onLogin={handleUserLogin} />
      )}
    </div>
  );
}

export default Home;
