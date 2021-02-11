import {ADD_PRODUCTS_BASKET, CLEAR_BASKET, REMOVE_PRODUCT_BASKET} from "./types";

export const addBasket = (obj) => ({
    type: ADD_PRODUCTS_BASKET,
    payload: obj,
});

export const clearBasket = () => ({
    type: CLEAR_BASKET,
});

export const removeBasketItem = (id) => ({
    type: REMOVE_PRODUCT_BASKET,
    payload: id,
});
