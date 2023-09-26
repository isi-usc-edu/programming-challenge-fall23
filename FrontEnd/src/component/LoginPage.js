import React, { Component, useEffect } from 'react';
import cookie from "cookie";

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        document.title = "Login • Programming Challenge";
        if (document.cookie != '')
        {
            var cookieData = (document.cookie.split('; ').find((cookie) => cookie.startsWith('errorMsg')).split('=')[1].slice(1, -1))
            if (cookieData != '') {
                alert(cookieData);
                document.cookie = cookie.serialize('errorMsg', 'NA');
            }
        }
    }

    render() {
        return (
            <main>
                <div className="utility-page-wrap">
                    <div data-w-id="5e86ada79942c1e4247fd4c700000000000b" className="utility-page-content-password w-password-page w-form">
                        <form action="/api/authUser" method="post" id="auth-form" name="auth-form" data-name="Auth Form" className="utility-page-form w-password-page">
                            <div className="icon-password-content">
                                <img src="../static/images/login.png" className="icon-password" />
                            </div>
                            <h2>Authorization Required</h2>
                            <p>Please enter your name to continue shopping, following which you would be redirected to your cart and confirm your order! 😊</p>
                            <input type="text" className="input password w-password-page w-input" autoFocus={true} maxLength="256" name="name" data-name="field" placeholder="Enter your name" id="field" />
                            <input type="submit" value="Enter now" data-wait="Please wait..." className="button-primary full-width w-password-page w-button" />
                            <div className="w-password-page w-form-fail">
                                <div>Incorrect password. Please try again.</div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        );
    }
}