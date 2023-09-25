import React, { useState, useEffect } from "react";
import { Product } from "./product";
import "./shop.css";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export const Shop = () => {
  const [products, setData] = useState([]);
  const [speechRecognitionSupported, setSpeechRecognitionSupported] =
    useState(null)

  const fetchdata = async () => {

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {

      fetch("https://fakestoreapi.com/products")
      .then(response => {
        
        return response.json()
      })
      .then(data => {
        setData(data)
      })

      
    } catch (error) {
      console.error('Error:', error);
    }
  };
  let {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    fetchdata();
    setSpeechRecognitionSupported(browserSupportsSpeechRecognition);
  }, [browserSupportsSpeechRecognition]);

  transcript = "Record Your Order...";


  return (

    <div className="shop">

      <div className="shopTitle">
        <h1>Welcome To Your Shop</h1>
      </div>

      <div>
      {/* <p>Microphone: {listening ? 'on' : 'off'}</p> */}

      
        <input type="text" id="fname" name="firstname" placeholder={transcript}/>
        
        <button className='button button1' onClick={SpeechRecognition.startListening}>Start</button>
        
        {/* <button onClick={SpeechRecognition.stopListening}>Stop</button> */}
        <button className='button button2' onClick={resetTranscript}>X</button>
      
  

      
      {/* <p>{transcript}</p> */}
      </div>

     
      <div className="products">
        {products.map((product) => (
          <Product data={product} />
        ))}
      </div>
    </div>
  );
};

