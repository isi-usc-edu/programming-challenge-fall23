import React, {useEffect, useState} from "react";
import {productList as productListData} from "./testData";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import {fetchAllProduct} from "./context/Connection";
import {Button} from "@mui/material";
import SearchBar from "./components/SearchBar";

 export default function MyApp() {

    const [productList, setProductList] = useState([]);
    const [completeProductList, setCompleteProductList] = useState([])
    const [addNewTaskForm, setAddNewTaskForm] = useState(false);
    const [searchText, setSearchText] = useState('');


    const addProduct = async (product) => {
        const request = await fetch('https://fakestoreapi.com/products',{
            method:"POST",
                body:JSON.stringify(
                {
                    title: 'arihant',
                    price: 13.5,
                    description: 'lorem ipsum set',
                    image: 'https://i.pravatar.cc',
                    category: 'electronic'
                }
            )
        })
        const data = await request.json()
        console.log(data);
        setProductList([...productList, {id: data.id, ...product}]);
    }

    const searchInList = (keyword) => {
        const updateProductList = completeProductList.filter((product) => {
            return product.title.toLowerCase().includes(keyword)
        });
        setProductList([...updateProductList])
        setSearchText(keyword)
    }

     useEffect(() => {
         const fetchAllProduct = async () => {
             const products = await fetch('https://fakestoreapi.com/products');
             const data =  await products.json()
             setProductList(data)
             setCompleteProductList(data)
         }
         fetchAllProduct()
     }, []);

  return (
      <div>

          <SearchBar searchText={searchText} onChange={searchInList} />
          <br />
          <Button
              onClick={() => setAddNewTaskForm(!addNewTaskForm)}
          >
              {addNewTaskForm ? 'Close' : 'Add New Task'}
          </Button>
          {addNewTaskForm && <AddProduct addProduct={addProduct} />}
          <ProductList productList={productList} />
      </div>
  );
}
