import React from "react";
import {TextField} from "@mui/material";
const SearchBar = ({onChange, searchText}) => {

    return (
        <>
        <TextField
            label='Search Item'
            onChange={(e) => onChange(e.target.value.toLowerCase())}
        />
        </>
    )
}

export default SearchBar