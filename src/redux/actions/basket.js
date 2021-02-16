import {ADD_PRODUCTS_BASKET, CLEAR_BASKET, MINUS_BASKET_ITEM, PLUS_BASKET_ITEM, REMOVE_PRODUCT_BASKET} from "./types";

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

export const plusBasketItem = (id) => ({
    type: PLUS_BASKET_ITEM,
    payload: id,
});

export const minusBasketItem = (id) => ({
    type: MINUS_BASKET_ITEM,
    payload: id,
});
