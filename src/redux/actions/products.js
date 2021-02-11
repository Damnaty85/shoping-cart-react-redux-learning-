import {SET_LOADED, SET_PRODUCTS} from "./types";

export const fetchProducts = (category) => async (dispatch) => {
    dispatch({
        type: SET_LOADED,
        payload: false,
    });

    await fetch(`http://localhost:3005/products/${category && `?category=${category}`}`)
        .then(response => response.json())
        .then(data => dispatch(setProducts(data)))
};

const setProducts = (items) => ({
    type: SET_PRODUCTS,
    payload: items,
});
