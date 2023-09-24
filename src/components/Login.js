import React, {useState} from "react";
import {Button, TextField} from "@mui/material";
export const Login = ({setUsername, setLoginPage}) => {
    const [name, setName] = useState('');
    const handleLoginSubmit = () => {
        console.log('Login submit')
        localStorage.setItem('username', name)
        setUsername(name);
        setLoginPage(true);
    }
    return (
        <>
        <form onSubmit={() => handleLoginSubmit()}>
            <TextField
                value={name}
                label={'Your Name'}
                onInput={(e) => setName(e.target.value)}
            />
            <Button type='submit' >Login</Button>
        </form>
        </>
    )
}