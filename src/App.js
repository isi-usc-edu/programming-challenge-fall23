import React, {useState} from "react";
import {productList as productListData} from "./testData";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import {Add} from "@mui/icons-material";
export default function MyApp() {
    const [productList, setProductList] = useState(productListData);
    const udpateChecked = (id) => () => {
        // console.log(product)
        productList.map((product) => {
            if(product.id === id)
                product.isChecked = !product.isChecked;
        })
        setProductList([...productList]);

    }
  return (
      <div>
          <AddProduct />
          <ProductList productList={productList} updateProductList={udpateChecked} />
      </div>
  );
}
