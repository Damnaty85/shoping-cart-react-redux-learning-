import {SET_LOADED, SET_PRODUCTS} from "../actions/types";

const initialState = {
    items: [],
    loadMore: null,
    isLoaded: false,
};

const products = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            const newItems = action.payload;
            const {items} = state;
            return {
                ...state,
                items: [...items, ...newItems],
                loadMore: newItems.length,
                isLoaded: true,
            };
        case SET_LOADED:
            return {
                ...state,
                isLoaded: action.payload,
            };

        default:
            return state;
    }
};

export default products;
