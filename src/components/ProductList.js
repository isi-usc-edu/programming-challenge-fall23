import {Box, Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import React from "react";

const ProductList = React.forwardRef(({productList, updateProductList}, ref) => {
    // console.log(ref)
    return (
        <Box sx={{
            border: '1px dashed black'
        }}>
            <p style={
                {
                    fontSize: '20px',
                }
            }> Grocery List: </p>
            <List ref={ref}>
                {
                    productList.map((product) => {
                        return (
                            <ListItem key={product.id}>
                                <ListItemButton>
                                    <ListItemText primary={product.title}/>
                                </ListItemButton>
                            </ListItem>
                        )
                    })
                }
            </List>
        </Box>
    );
})

export default ProductList