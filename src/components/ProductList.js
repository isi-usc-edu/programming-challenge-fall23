import {Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import React from "react";

const ProductList = ({productList, updateProductList}) => {
    return (
        <List>
            {
                productList.map((product) => {
                    return (
                        <ListItem key={product.id} >
                            <ListItemButton>
                                <ListItemText primary={product.title} />
                            </ListItemButton>
                        </ListItem>
                    )
                })
            }
        </List>
    )
}

export default ProductList