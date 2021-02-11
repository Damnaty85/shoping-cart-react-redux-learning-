import React, {useCallback, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import Card from "../components/Card";
import LoadingItem from "../components/Loader";
import { fetchProducts } from "../redux/actions/products";
import { addBasket } from "../redux/actions/basket";
import SizeFilter from "../components/SizeFilter";
import CategoryFilter from "../components/CategoryFilter";
import {setCategory} from "../redux/actions/filters";

function Home() {
    const dispatch = useDispatch();
    const items = useSelector(({ products }) => products.items);
    const isLoaded = useSelector(({ products }) => products.isLoaded);
    const cartItems = useSelector(({ addToCart }) => addToCart.items);
    const { category } = useSelector(({ filters }) => filters);

    useEffect(() => {
        dispatch(fetchProducts(category));
    },[category, dispatch]);

    const addProductToBasket = (obj) => {
        dispatch(addBasket(obj));
    };

    const handleChangeCategories = useCallback((evt) => {
        dispatch(setCategory(evt))
    }, [dispatch]);

    return (
        <>
            <div className="card__filters">
                <SizeFilter filterValue={Array.from(items, ({sizes}) => sizes)}/>
                <CategoryFilter
                    allCategories={Array.from(items, ({category}) => category)}
                    handleChangeCategories={handleChangeCategories}
                    activeCategory={category}
                />
            </div>
            <div className="card__wrapper">
                {
                    isLoaded ?
                        items.map((obj) => (
                            <Card
                                {...obj}
                                key={obj.id}
                                addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                                addBasket={addProductToBasket}
                            />
                        ))
                        : Array(20)
                            .fill(0)
                            .map((_, index) => <LoadingItem key={index} />)
                }
            </div>
        </>
    );
}

export default Home;
