import React, {useCallback, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import Card from "../components/Card";
import LoadingItem from "../components/Loader";
import SmartFilter from "../components/SmartFilter";
import Sorting from "../components/Sorting";
import {fetchProducts} from "../redux/actions/products";
import {setNewPage} from "../redux/actions/products";
import { addBasket } from "../redux/actions/basket";
import {clearFilter, setFilter, setSortBy} from "../redux/actions/filters";
import ScrollToTop from "../components/common/ScrollToTop";

function useOnScreen(options) {
    const [ref, setRef] = React.useState(null);
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
        if (!ref) return;
        const observer = new IntersectionObserver(interSectionCallback, options);
        observer.observe(ref);

        const mountChildren = () => {
            if (visible) return;
            setVisible(true)
        };

        const unMountChildren = () => {
            if (!visible) return;
            setVisible(false);
        };

        function interSectionCallback(entries){
            entries.forEach(entry => {
                // console.log("Intersection ratio", entry.intersectionRatio * 100);
                if (entry.isIntersecting) {
                    mountChildren();
                } else {
                    unMountChildren();
                }
            });
        }

        return () => observer.unobserve(ref);

    }, [ref, options]);
    return [setRef, visible];
}

function Home() {
    const [setRef, visible] = useOnScreen({
        root: null,
        rootMargin: '0px',
        threshold: 0.25
    });
    const dispatch = useDispatch();
    const items = useSelector(({ products }) => products.items);
    const page = useSelector(({ products }) => products.page);
    const isLoaded = useSelector(({ products }) => products.isLoaded);
    const cartItems = useSelector(({ addToCart }) => addToCart.items);
    const { categoryKey, categoryValue, sortBy } = useSelector(({ filters }) => filters);

    useEffect(() => {
        dispatch(fetchProducts(sortBy, categoryKey, categoryValue, page));
    },[sortBy, categoryKey, categoryValue, dispatch, page]);

    useEffect(() => {
        if (visible) {
            dispatch(setNewPage(page));
        }
    }, [visible]);

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
                    <div className={`cards__wrapper`}>
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
                    <div className={`more-loading`} ref={setRef} style={{height: '100px'}}>
                        {
                            visible && <p>Loading...</p>
                        }
                    </div>
                </div>
            </section>
            <ScrollToTop/>
        </div>
    );
}

export default Home;
