import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            userName: undefined
        };
    }

    async componentDidMount() {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/fetchProducts');
            if (!response.ok) {
                throw new Error(`API request failed with status: ${response.status}`);
            }
            const data = await response.json();
            this.setState({ data });
        } 
        catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    render() {
        const { data } = this.state;

        return (
            <main>
                <div data-w-id="11992f98-f2f0-a5cb-0309-2fec9271bf71" style={{opacity:"0"}} className="section hero-v2">
                    <div className="container-default">
                        <div className="split-content hero-v2">
                            <h1 data-w-id="b7440927-b4ab-1d4c-bee9-b6ddbc052dc1" style={{opacity:"0"}} className="heading-hero-v2"><span className="color-primary-1">Fresh</span> for Everyone</h1>
                            <p data-w-id="b7440927-b4ab-1d4c-bee9-b6ddbc052dc5" style={{opacity:"0"}} className="paragraph-hero-v2"> Elevate Your Grocery Shopping Experience with Quality, Convenience, and Variety.</p>
                            <div className="w-layout-grid achievements-grid">
                                <div data-w-id="2a6de806-990a-2f70-e83d-8c5d6e7446c2" style={{opacity:"0"}} className="achievement-wrapper">
                                    <div className="achievement-number" id="productsAvailable"></div>
                                    <div className="achievement">Products Available</div>
                                </div>
                                <div data-w-id="08a8f587-8a1d-11a7-de59-a9e1ab2039a4" style={{opacity:"0"}} className="achievement-wrapper">
                                    <div className="achievement-number" id="categoriesAvailable"></div>
                                    <div className="achievement">Categories</div>
                                </div>
                                <div data-w-id="4860def6-a710-82c2-4885-fa2fca961b15" style={{opacity:"0"}} className="achievement-wrapper">
                                    <div className="achievement-number" id="avgReviews"></div>
                                    <div className="achievement">Avg. Ratings</div>
                                </div>
                                <div data-w-id="08694315-1cc7-5552-e67d-e20e2f441b8c" style={{opacity:"0"}} className="achievement-wrapper">
                                    <div className="achievement-number" id="prodRatings"></div>
                                    <div className="achievement">Reviews</div>
                                </div>
                            </div>
                        </div>
                        <img className="image-hero-v2" src="https://images.unsplash.com/photo-1628102491629-778571d893a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2960&q=80" style={{opacity:"0"}} sizes="(max-width: 479px) 93vw, (max-width: 767px) 94vw, (max-width: 991px) 95vw, 100vw" data-w-id="ddc92a39-8756-271c-3ca9-0709c4fa2ab6" srcSet="https://images.unsplash.com/photo-1628102491629-778571d893a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2960&q=80 500w, https://images.unsplash.com/photo-1628102491629-778571d893a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2960&q=80 800w, https://images.unsplash.com/photo-1628102491629-778571d893a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2960&q=80 1080w, https://images.unsplash.com/photo-1628102491629-778571d893a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2960&q=80 1128w" />
                    </div>
                </div>
                <section className="section bg-neutral-100" id="shop">
                    <div className="container-default">
                        <div className="flex space-between-center">
                            <h2 data-w-id="f88f7924-f0ed-4cf8-c728-3bac84cc4711" style={{opacity:"0"}}>Popular products <span id="geoLocation"></span></h2>
                        </div>
                        <div className="w-layout-grid grid-jobs">
                            <div data-w-id="f88f7924-f0ed-4cf8-c728-3bac84cc4719" style={{opacity:"0"}}>
                                <div className="w-dyn-list">
                                    <div role="list" className="job-cards-grid w-dyn-items">
                                    {
                                        data?.map((item) => (
                                        <div key={ item.id } role="listitem" className="w-dyn-item productsList">
                                            <div className="job-post-card">
                                                <a href="job/digital-marketing-specialist.html" className="w-inline-block">
                                                    <img alt="Digital Marketing Specialist" src={ item.image } className="company-logo job-card" />
                                                </a>
                                                <div className="job-card-info">
                                                    <div className="job-info-primary">
                                                        <a href="company/webflow.html" className="job-card-company-name w-inline-block">
                                                            <div>{ item.category.toUpperCase() }</div>
                                                        </a>
                                                        <a href="job/digital-marketing-specialist.html" className="job-card-title-link w-inline-block">
                                                            <h3 className="job-card-title">{ item.title }</h3>
                                                        </a>
                                                        <div className="job-card-info-bottom">
                                                            <div className="job-card-type-container">
                                                                <img src="../static/images/star.png" height="24" alt="" className="job-card-type-icon" />
                                                                <div className="job-card-type-text">{ item.rating.rate } ({ item.rating.count })</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="job-info-secondary">
                                                        <div className="job-card-date"><strong>${item.price} USD</strong></div>
                                                        <div className="job-card-spacer w-condition-invisible" data-id={item.id}></div>
                                                        <a style={{color: "white", cursor: "pointer"}} id={item.id} className="product-id" onClick={function() {addProductToCart(item.id);}}><div className="job-card-date addToCart">Add to Cart</div></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <aside data-w-id="30d385e6-0988-f484-1156-8e7aabda315c" className="sidebar-jobs">
                                <div id="w-node-_30d385e6-0988-f484-1156-8e7aabda315d-abda315c" className="sidebar-search">
                                    <h3 className="sidebar-title">Search products</h3>
                                    <div className="input-group mb-3">
                                        <input type="text" id="searchProduct" className="form-control search-input w-input" placeholder="Search products ..."/>
                                        <div className="input-group-prepend">
                                            <button className="btn btn-outline-secondary" style={{backgroundColor:"#E5E5EF"}} id="micBtn" type="button"><img height="32" src="../static/images/microphone.png"/></button>
                                        </div>
                                    </div>
                                </div>
                                <div id="w-node-_30d385e6-0988-f484-1156-8e7aabda3163-abda315c" className="card sidebar">
                                    <h3 className="sidebar-title">Categories</h3>
                                    <div className="w-dyn-list">
                                        <div role="list" className="sidebar-menu-grid w-dyn-items">
                                            <div role="listitem" className="sidebar-menu w-dyn-item">
                                                <a data-w-id="30d385e6-0988-f484-1156-8e7aabda3169" className="sidebar-menu-link category w-inline-block">
                                                    <div className="flex">
                                                        <img alt="Electronics" src="../static/images/electronics.png" height="24" className="sidebar-category-icon" />
                                                        <div>Electronics</div>
                                                    </div>
                                                </a>
                                            </div>
                                            <div role="listitem" className="sidebar-menu w-dyn-item">
                                                <a data-w-id="30d385e6-0988-f484-1156-8e7aabda3169" className="sidebar-menu-link category w-inline-block">
                                                    <div className="flex">
                                                        <img alt="Jewelery" src="../static/images/jewelry.png" height="24" className="sidebar-category-icon" />
                                                        <div>Jewelery</div>
                                                    </div>
                                                </a>
                                            </div>
                                            <div role="listitem" className="sidebar-menu w-dyn-item">
                                                <a data-w-id="30d385e6-0988-f484-1156-8e7aabda3169" className="sidebar-menu-link category w-inline-block">
                                                    <div className="flex">
                                                        <img alt="Men's Clothing" src="../static/images/men.png" height="24" className="sidebar-category-icon" />
                                                        <div>Men's Clothing</div>
                                                    </div>
                                                </a>
                                            </div>
                                            <div role="listitem" className="sidebar-menu w-dyn-item">
                                                <a data-w-id="30d385e6-0988-f484-1156-8e7aabda3169" className="sidebar-menu-link category w-inline-block">
                                                    <div className="flex">
                                                        <img alt="Women's Clothing" src="../static/images/dress.png" height="24" className="sidebar-category-icon" />
                                                        <div>Women's Clothing</div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </section>
            </main>
        );
    }
}