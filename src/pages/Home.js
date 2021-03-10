import React, {useCallback, useEffect, useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import Card from "../components/Card";
import LoadingItem from "../components/Loader";
import SmartFilter from "../components/SmartFilter";
import Sorting from "../components/Sorting";
import {fetchProducts} from "../redux/actions/products";
import {loadMoreItems} from "../redux/actions/infinityScroll";
import { addBasket } from "../redux/actions/basket";
import {clearFilter, setFilter, setSortBy} from "../redux/actions/filters";
import ScrollToTop from "../components/common/ScrollToTop";

function Home() {
    const dispatch = useDispatch();
    const items = useSelector(({ products }) => products.items);
    const loadMore = useSelector(({ products }) => products.loadMore);
    const page = useSelector(({infinityScroll}) => infinityScroll.page);
    const isLoaded = useSelector(({ products }) => products.isLoaded);
    const cartItems = useSelector(({ addToCart }) => addToCart.items);
    const { categoryKey, categoryValue, sortBy } = useSelector(({ filters }) => filters);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        dispatch(fetchProducts(sortBy, categoryKey, categoryValue, page));
        return () => window.removeEventListener('scroll', handleScroll);
    },[sortBy, categoryKey, categoryValue, dispatch, page]);

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        if (loadMore !== 0) {
            dispatch(loadMoreItems(page));
        }
    }

    const addProductToBasket = (obj) => {
        dispatch(addBasket(obj));
    };

    const handleChangeFilters = useCallback((evt) => {
        dispatch(setFilter(evt))
    }, [dispatch]);

    const handleClearFilters = useCallback(() => {
        dispatch(clearFilter())
    }, [dispatch]);

    const onSelectSortType = React.useCallback((type) => {
        dispatch(setSortBy(type));
    }, [dispatch]);

    return (
        <div className="container">
            <section className="cards">
                <div className="cards__left">
                    <SmartFilter
                        handleChangeFilters={handleChangeFilters}
                        handleClearFilters={handleClearFilters}
                        filterActive={categoryValue}
                    />
                </div>
                <div className="cards__right">
                    <div className="cards-sort">
                        <Sorting
                            activeSortType={sortBy.type}
                            onSelectSortType={onSelectSortType}
                        />
                    </div>
                    <div className="cards__wrapper">
                        {
                            isLoaded ?
                                items.map((obj) => (
                                    <Card
                                        {...obj}
                                        key={obj.id}
                                        addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                                        addBasket={addProductToBasket}
                                    />
                                )) : Array(12)
                                    .fill(0)
                                    .map((_, index) => <LoadingItem key={index} />)

                        }
                    </div>
                </div>
            </section>
            <ScrollToTop/>
        </div>
    );
}

export default Home;
