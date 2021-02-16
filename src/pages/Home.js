import React, {useCallback, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import Card from "../components/Card";
import LoadingItem from "../components/Loader";
import CategoryFilter from "../components/CategoryFilter";
import Sorting from "../components/Sorting";
import { fetchProducts } from "../redux/actions/products";
import { addBasket } from "../redux/actions/basket";
import SizeFilter from "../components/SizeFilter";
import {setCategory, setSortBy} from "../redux/actions/filters";

function Home() {
    const dispatch = useDispatch();
    const items = useSelector(({ products }) => products.items);
    const isLoaded = useSelector(({ products }) => products.isLoaded);
    const cartItems = useSelector(({ addToCart }) => addToCart.items);
    const { category, sortBy } = useSelector(({ filters }) => filters);

    useEffect(() => {
        dispatch(fetchProducts(sortBy, category));
    },[sortBy, category, dispatch]);

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
            <div className="cards__control">
                <div className="cards-filters">
                    <p>Фильтр:</p>
                    <div className="cards-filters__container">
                        <SizeFilter filterValue={Array.from(items, ({sizes}) => sizes)}/>
                        <CategoryFilter
                            allCategories={Array.from(items, ({category}) => category)}
                            handleChangeCategories={handleChangeCategories}
                            activeCategory={category}
                        />
                    </div>
                </div>
                <div className="cards-sort">
                    <Sorting
                        activeSortType={sortBy.type}
                        onSelectSortType={onSelectSortType}
                    />
                </div>
            </div>
            <section className="cards">
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
                                .map((_, index) => <LoadingItem key={index} />)}

                    }
                </div>
            </section>
        </div>
    );
}

export default Home;
