import { combineReducers } from "redux";
import addToCart from "./basket";
import products from "./products";
import filters from "./filters";

export default combineReducers({
    addToCart,
    products,
    filters
})
