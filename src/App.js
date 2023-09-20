import React, { useState, useEffect } from 'react';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [shoppingList, setShoppingList] = useState([]);
  const [newItemText, setNewItemText] = useState('');
  const [recognition, setRecognition] = useState(null);
  const [narrationActive, setNarrationActive] = useState(false);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognitionInstance = new window.webkitSpeechRecognition();
      recognitionInstance.lang = 'en-US';
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      setRecognition(recognitionInstance);
    } else {
      console.log('Speech recognition not supported by your browser.');
    }
  }, []);

  const handleLogin = () => {
    if (username.trim() !== '') {
      setLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setUsername('');
    setLoggedIn(false);
  };

  const addItemText = () => {
    if (newItemText.trim() !== '') {
      setShoppingList([...shoppingList, newItemText]);
      setNewItemText('');
    }
  };

  const startNarration = () => {
    if (recognition) {
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setNewItemText(transcript);
      };
      recognition.start();
      setNarrationActive(true);
    }
  };

  const stopNarration = () => {
    if (recognition) {
      recognition.stop();
      setNarrationActive(false);
    }
  };

  const addItemNarration = () => {
    if (!narrationActive) {
      startNarration();
    } else {
      stopNarration();
    }
  };

  const removeItem = (index) => {
    const updatedList = [...shoppingList];
    updatedList.splice(index, 1);
    setShoppingList(updatedList);
  };

  const printList = () => {
    window.print();
  };

  const shareListByEmail = () => {
    const shoppingListText = shoppingList.join('\n'); // Convert the list to a string with line breaks
    const recipientEmail = 'aryanshah1902@gmail.com'; // Replace with recipient's email
  
    fetch('http://localhost:3000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipientEmail, shoppingList: shoppingListText }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message); // Log the server response
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  

  return (
    <div className="App">
      {loggedIn ? (
        <div>
          <h2>Welcome, {username}!</h2>
          <button onClick={handleLogout}>Logout</button>

          <h3>Shopping List</h3>
          <input
            type="text"
            placeholder="Enter item (textual entry)"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
          />
          <button onClick={addItemText}>Add Item (textual entry)</button>

          {recognition && (
            <div>
              <button onClick={addItemNarration}>
                {narrationActive ? 'Stop Narration' : 'Start Narration'}
              </button>
            </div>
          )}

          <ul>
            {shoppingList.map((item, index) => (
              <li key={index}>
                {item}{' '}
                <button onClick={() => removeItem(index)}>Remove</button>
              </li>
            ))}
          </ul>

          <button onClick={shareListByEmail}>Share List via Email</button>
          <button onClick={printList}>Print List</button> {/* Add this button */}
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default App;
