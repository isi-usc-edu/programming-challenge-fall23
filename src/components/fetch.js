import React, { useState, useEffect } from 'react';

function MyComponent() {
  // Step 3: Initialize state variable to store API response
  const [apiData, setApiData] = useState(null);

  // Step 4: Make the fetch request when the component mounts
  useEffect(() => {
    // Define the API URL
    const apiUrl = 'https://dummyjson.com/products';

    // Make the fetch request
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Step 5: Update state variable with fetched data
        setApiData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // The empty dependency array ensures this effect runs only once

  return (
    <div>
      <h1>API Data:</h1>
      {apiData ? (
        <pre>{JSON.stringify(apiData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MyComponent;
