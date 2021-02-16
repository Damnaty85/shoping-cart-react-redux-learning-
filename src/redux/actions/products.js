import {SET_LOADED, SET_PRODUCTS} from "./types";
const BASE_URL = `http://localhost:3005/products`;

const setProducts = (items) => ({
    type: SET_PRODUCTS,
    payload: items,
});

export const fetchProducts = (sortBy, category) => async (dispatch) => {
    dispatch({
        type: SET_LOADED,
        payload: false,
    });

    await fetch(`${BASE_URL}?${category !== "" ? `category=${category}` : ''}&_sort=${sortBy.type}&_order=${sortBy.order}`)
        .then(response => response.json())
        .then(data => dispatch(setProducts(data)))
};
