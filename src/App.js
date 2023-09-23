import React from 'react';
import Login from './components/Login';
import SpeechToText from './components/SpeechToText';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/cart' element={<SpeechToText/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
