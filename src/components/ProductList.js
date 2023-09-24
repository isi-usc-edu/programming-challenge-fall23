import {Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import React from "react";

const ProductList = ({productList, updateProductList}) => {
    return (
        <List>
            {
                productList.map((product) => {
                    return (
                        <ListItem key={product.id} >
                            <ListItemButton onClick={updateProductList(product.id)}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={product.isChecked}
                                        tabIndex={-1}
                                        disableRipple
                                        // inputProps={{ 'aria-labelledby': product.id }}
                                    />
                                </ListItemIcon>
                                <ListItemText primary={product.name} />
                            </ListItemButton>
                        </ListItem>
                    )
                })
            }
        </List>
    )
}

export default ProductList