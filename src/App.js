import React, {useEffect, useRef, useState} from "react";
import {productList as productListData} from "./testData";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import {Button, IconButton, Fab, Grid,} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import SearchBar from "./components/SearchBar";
import {checkBrowserCompatibility, renderSpeech} from './WebSpeechAPI/WebSpeedAPI'
import {render} from "@testing-library/react";
import {Mic, Speaker, Add} from "@mui/icons-material";
import {SpeakerComponent} from "./components/Speaker";
import {PrintList} from "./components/PrintList"

export default function MyApp() {
    const componentRef = useRef();
    const [productList, setProductList] = useState([]);
    const [completeProductList, setCompleteProductList] = useState([])
    const [addNewTaskForm, setAddNewTaskForm] = useState(false);
    const [searchText, setSearchText] = useState('');

    checkBrowserCompatibility()
    const addProduct = async (product) => {
        const request = await fetch('https://fakestoreapi.com/products', {
            method: "POST",
            body: JSON.stringify(
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
        // console.log(data);
        setProductList([...productList, {id: Math.random() * 10000, ...product}]);
        setCompleteProductList([...completeProductList, {id: Math.random() * 10000, ...product}])
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
            const data = await products.json()
            setProductList(data)
            setCompleteProductList(data)
        }
        fetchAllProduct()
    }, []);
    const addNewProductSpeech = async () => {
        console.log("speak")
        const title = await renderSpeech(addProduct)
    }
    return (
        <div>
            <Grid2 container spacing={2}>
                <Grid2 xs={8}>
                    <SearchBar searchText={searchText} onChange={searchInList}/>
                </Grid2>
                <Grid2 xs={4}>
                    <PrintList componentRef={componentRef} />
                </Grid2>
                <Grid2 xs={7}>
                    <ProductList productList={productList} ref={componentRef}/>
                </Grid2>
                <Grid2 xs={5}>
                    <Button
                        onClick={() => setAddNewTaskForm(!addNewTaskForm)}
                    >
                        {addNewTaskForm ? 'Close' : 'Add New Task'}
                    </Button>
                    {addNewTaskForm && <AddProduct addProduct={addProduct}/>}
                </Grid2>


                <SpeakerComponent addProduct={() => addNewProductSpeech()}/>
            </Grid2>
        </div>
    );
}
