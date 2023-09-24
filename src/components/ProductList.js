import {Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import React from "react";

const ProductList = React.forwardRef(({productList, updateProductList}, ref) => {
    // console.log(ref)
    return (
        <List ref={ref}>
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
    );
})

export default ProductList