import React, { Component, useEffect } from 'react';
import ListProduct from './ListProduct';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartData: [],
            userName: undefined
        };
    }

    async componentDidMount() {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/getCart');
            if (!response.ok) {
                throw new Error(`API request failed with status: ${response.status}`);
            }
            const cartData = await response.json();
            this.setState({ cartData });
        } 
        catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    render() {
        const { cartData } = this.state;

        return (
            <main>
                <div className="section checkout">
                    <div className="container-medium">
                        <div className="text-center">
                            <h1 data-w-id="25e4809e-16bd-558c-f60b-17c21b9bbd2b"><br></br>Checkout</h1>
                        </div>
                    </div>
                    <div data-w-id="5eeac0d6d48cc49315c0af42aN" data-wf-page-link-href-prefix="" className="w-commerce-commercecheckoutformcontainer checkout-form">
                        <div className="w-commerce-commercelayoutcontainer container-checkout w-container" id="printableArea">
                            <div className="w-commerce-commercelayoutmain mg-0">
                                <form data-node-type="commerce-checkout-customer-info-wrapper" className="w-commerce-commercecheckoutcustomerinfowrapper">
                                    <div className="w-commerce-commercecheckoutblockheader block-header">
                                        <h2 className="checkout-subtitle">Customer Info</h2>
                                    </div>
                                    <fieldset className="w-commerce-commercecheckoutblockcontent block-content">
                                        <label htmlFor="" className="w-commerce-commercecheckoutlabel label">Billing Name</label>
                                        <input type="text" id="cartName" data-wf-bindings="%5B%7B%22value%22%3A%7B%22type%22%3A%22PlainText%22%2C%22filter%22%3A%7B%22type%22%3A%22identity%22%2C%22params%22%3A%5B%5D%7D%2C%22dataPath%22%3A%22database.commerceOrder.customerEmail%22%7D%7D%5D" className="w-commerce-commercecheckoutemailinput input" name="name" value={document.cookie.split('; ').find((cookie) => cookie.startsWith('userName')).split('=')[1].slice(1, -1)} disabled={true} readOnly={true} style={{backgroundColor: "#E5E5EF"}} />
                                    </fieldset>
                                </form>
                                <div className="w-commerce-commercecheckoutorderitemswrapper">
                                    <div className="w-commerce-commercecheckoutsummaryblockheader block-header">
                                        <h2 className="checkout-subtitle">Items in Order</h2>
                                    </div>
                                    <fieldset className="w-commerce-commercecheckoutblockcontent block-content">
                                        <div role="list" className="w-commerce-commercecheckoutorderitemslist" data-wf-collection="database.commerceOrder.userItems" data-wf-template-id="wf-template-5eeac0d6d48cc49315c0af42000000000086">
                                        <ListProduct productsList={cartData.productsList}></ListProduct>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                            <div className="w-commerce-commercelayoutsidebar">
                                <div className="w-commerce-commercecheckoutordersummarywrapper">
                                    <div className="w-commerce-commercecheckoutsummaryblockheader block-header">
                                        <h2 className="checkout-subtitle">Order Summary</h2>
                                    </div>
                                    <fieldset className="w-commerce-commercecheckoutblockcontent block-content">
                                        <div className="w-commerce-commercecheckoutsummarylineitem">
                                            <div>Subtotal</div>
                                            <div data-wf-bindings="%5B%7B%22innerHTML%22%3A%7B%22type%22%3A%22CommercePrice%22%2C%22filter%22%3A%7B%22type%22%3A%22price%22%2C%22params%22%3A%5B%5D%7D%2C%22dataPath%22%3A%22database.commerceOrder.subtotal%22%7D%7D%5D" className="subtotal-price">${cartData.subTotal} USD</div>
                                        </div>
                                        <div className="w-commerce-commercecheckoutsummarylineitem">
                                            <div>Tax</div>
                                            <div data-wf-bindings="%5B%7B%22innerHTML%22%3A%7B%22type%22%3A%22CommercePrice%22%2C%22filter%22%3A%7B%22type%22%3A%22price%22%2C%22params%22%3A%5B%5D%7D%2C%22dataPath%22%3A%22database.commerceOrder.subtotal%22%7D%7D%5D" className="subtotal-price">${cartData.tax} USD</div>
                                        </div>
                                        <div className="w-commerce-commercecheckoutsummarylineitem">
                                            <div><strong>Total</strong></div>
                                            <div data-wf-bindings="%5B%7B%22innerHTML%22%3A%7B%22type%22%3A%22CommercePrice%22%2C%22filter%22%3A%7B%22type%22%3A%22price%22%2C%22params%22%3A%5B%5D%7D%2C%22dataPath%22%3A%22database.commerceOrder.total%22%7D%7D%5D" className="w-commerce-commercecheckoutsummarytotal total-price"><strong>${Math.round(cartData.totalAmt * 100)/100} USD</strong></div>
                                        </div>
                                    </fieldset>
                                </div>
                                <a onClick={function() {emailCartData();}} data-node-type="commerce-checkout-place-order-button" className="w-commerce-commercecheckoutplaceorderbutton button-primary" style={{color: "white"}}>Share with a friend</a>
                                <a onClick={function() {printDiv('printableArea');}} data-node-type="commerce-checkout-place-order-button" className="w-commerce-commercecheckoutplaceorderbutton button-primary" style={{color: "white"}}>Print Order</a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}