import React, { Component } from 'react';
import ReactDOM from "react-dom/client";
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import CartPage from './CartPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route exact path='/' element={<HomePage/>}></Route>
                    <Route path='/login' element={<LoginPage/>}></Route>
                    <Route path='/cart' element={<CartPage/>}></Route>
                </Routes>
            </BrowserRouter>
        );
    }
}

const appDiv = ReactDOM.createRoot(document.getElementById('app'));
appDiv.render(<React.StrictMode><App/></React.StrictMode>);