import React, {useCallback, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import Card from "../components/Card";
import LoadingItem from "../components/Loader";
import CategoryFilter from "../components/CategoryFilter";
import Sorting from "../components/Sorting";
import { fetchProducts } from "../redux/actions/products";
import { addBasket } from "../redux/actions/basket";
import {setCategory, setSortBy} from "../redux/actions/filters";

function Home() {
    const dispatch = useDispatch();
    const items = useSelector(({ products }) => products.items);
    const isLoaded = useSelector(({ products }) => products.isLoaded);
    const cartItems = useSelector(({ addToCart }) => addToCart.items);
    const { categoryKey, categoryValue, sortBy } = useSelector(({ filters }) => filters);

    useEffect(() => {
        dispatch(fetchProducts(sortBy, categoryKey, categoryValue));
    },[sortBy, categoryKey, categoryValue, dispatch]);

    const addProductToBasket = (obj) => {
        dispatch(addBasket(obj));
    };

    const handleChangeCategories = useCallback((evt) => {
        dispatch(setCategory(evt))
    }, [dispatch]);


    const onSelectSortType = React.useCallback((type) => {
        dispatch(setSortBy(type));
    }, [dispatch]);

    return (
        <div className="container">
            <section className="cards">
                <div className="cards__left">
                    <CategoryFilter
                        handleChangeCategories={handleChangeCategories}
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
        </div>
    );
}

export default Home;
