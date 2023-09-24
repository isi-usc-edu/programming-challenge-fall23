import React, { useState, useEffect } from 'react';
import './SpeechToText.css';
import Autosuggest from 'react-autosuggest';
import CartItemList from './cartItems';

const recognition = new window.webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'en-US';

function SpeechToText() {
    const [listening, setListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [inputMethod, setInputMethod] = useState('speak');
    const [manualInput, setManualInput] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        recognition.onresult = handleRecognitionResult;
        recognition.onerror = handleRecognitionError;
        return () => {
            recognition.onresult = null;
            recognition.onerror = null;
            recognition.stop();
        };
    }, []);

    const toggleCart = () => {
        setShowCart(!showCart);
    };

    const handleRecognitionResult = (event) => {
        let newTranscript = transcript;
        for (let i = event.resultIndex; i < event.results.length; i++) {
            newTranscript += event.results[i][0].transcript + ' ';
        }
        setTranscript(newTranscript);
    };

    const handleRecognitionError = (event) => {
        console.error('Speech recognition error:', event.error);
        stopRecording();
    };

    const startRecording = () => {
        setTranscript('');
        recognition.start();
        setListening(true);
        setIsDisabled(true);
    };

    const stopRecording = () => {
        recognition.stop();
        setListening(false);
        setIsDisabled(false);
    };

    const handleTextareaChange = (e) => {
        if (inputMethod === 'speak') {
            setTranscript(e.target.value);
        } else if (inputMethod === 'type') {
            setManualInput(e.target.value);
        }
    };

    const fetchGroceries = () => {
        const url = 'https://dummyjson.com/products';
        return fetch(url)
            .then((res) => res.json())
            .then((data) => {
                return data;
            });
    };

    const addToCart = async () => {
        let product;
        const data = await fetchGroceries();
        if (inputMethod === 'speak') {
            console.log('Item added to cart:', transcript);
            product = searchProductByWord(transcript, data.products);
        } else if (inputMethod === 'type') {
            console.log('Item added to cart:', manualInput);
            product = searchProductByWord(manualInput, data.products);
        }

        if (!product || (transcript.trim().length == 0 && manualInput.trim().length == 0)) {
            console.log('No matching products found.');
            alert('No matching products found.');
        } else {
            console.log(`ID: ${product.id}`);
            console.log(`Title: ${product.title}`);
            console.log(`Price: $${product.price}`);
            console.log(`Rating: ${product.rating}`);
            console.log('------------------------');
            setCartItems([...cartItems, product]);
            alert(product.title + ' - Added to the cart');
        }
    };

    const handleRadioChange = (e) => {
        setInputMethod(e.target.value);
        setTranscript('');
        setManualInput('');
    };

    const getCartItems = () => {
        console.log('cart items', cartItems);
    };

    function searchProductByWord(word, productsData) {
        const cleanedWord = word.replace(/^\s+|\s+$/g, '');
        const foundProduct = productsData.find((product) =>
            product.title.toLowerCase().includes(cleanedWord.toLowerCase())
        );

        return foundProduct;
    }

    const renderSuggestion = (suggestion) => (
        <div>{suggestion.title}</div>
    );

    const handleInputChange = (event, { newValue }) => {
        setManualInput(newValue);
    };

    const onSuggestionsFetchRequested = async ({ value }) => {
        const data = await fetchGroceries();
        const filteredProducts = data.products.filter((product) =>
            product.title.toLowerCase().includes(value.toLowerCase())
        );

        setSuggestions(filteredProducts.slice(0, 5));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    return (
        <div>
            <div className="container">
                <h1 className="header">Please Select Input Method</h1>
                <div className="input-method-container">
                    <label>
                        <input
                            type="radio"
                            value="speak"
                            checked={inputMethod === 'speak'}
                            onChange={handleRadioChange}
                        />
                        Speak
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="type"
                            checked={inputMethod === 'type'}
                            onChange={handleRadioChange}
                        />
                        Type
                    </label>
                </div>
                {inputMethod === 'speak' && (
                    <div className="transcript-container">
                        <h2 className="transcript-header">Transcript:</h2>
                        <textarea
                            value={transcript}
                            className="transcript-textarea"
                            onChange={handleTextareaChange}
                        /> 
                        <button
                            className={`record-button ${listening ? 'listening' : ''}`}
                            onClick={listening ? stopRecording : startRecording}
                        >
                            <img src="/microphone.png" alt="Microphone" className="mic-image" />
                        </button>
                        <div style={{marginTop:"1rem", color:"red"}} className={`mic-status ${listening ? 'recording' : ''}`}>
                            {listening ? 'Recording....' : 'Please click on the mic to record'}
                        </div> 
                    </div>
                )}
                {inputMethod === 'type' && (
                    <div className="manual-input-container">
                        <h2 className="manual-input-header">Manually Add Items:</h2>
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={onSuggestionsClearRequested}
                            getSuggestionValue={(suggestion) => suggestion.title}
                            renderSuggestion={renderSuggestion}
                            inputProps={{
                                value: manualInput,
                                type: "search",
                                onChange: handleInputChange,
                            }}
                        />
                    </div>
                )}
                <div className="button-container">
                    <button className="add-to-cart-button" onClick={addToCart}>
                        <img src="/add.png" alt="Add to Cart" className="button-icon" />
                    </button>
                    <button className="add-to-cart-button" onClick={toggleCart}>
                        <img src="/add-to-cart.png" alt="Show List" className="button-icon" />
                    </button>
                </div>
            </div>
            {showCart && <CartItemList cartItems={cartItems} />}
        </div>
    );
}

export default SpeechToText;