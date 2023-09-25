import React from "react";
import {Button} from "@mui/material";

export const Logout = ({setLoginPage, setUsername}) => {
    const logoutUser = () => {
        localStorage.removeItem('username')
        setLoginPage(false)
        setUsername('')
    }

    return (
        <>
            <Button onClick={() => logoutUser()} >Logout</Button>
        </>
    )
}