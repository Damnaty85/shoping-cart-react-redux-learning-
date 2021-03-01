import {BASE_URL, SET_LOADED, SET_PRODUCTS} from "./types";

const setProducts = (items) => ({
    type: SET_PRODUCTS,
    payload: items,
});

export const fetchProducts = (sortBy, categoryKey, categoryValue) => async (dispatch) => {
    dispatch({
        type: SET_LOADED,
        payload: false,
    });

    await fetch(`${BASE_URL}?${categoryValue !== "" ? `&properties.${categoryKey}=${categoryValue}` : ''}&_sort=${sortBy.type}&_order=${sortBy.order}`)
        .then(response => response.json())
        .then(data => dispatch(setProducts(data)))
};
