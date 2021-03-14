import {SET_LOADED, SET_NEW_PAGE, SET_PRODUCTS} from "../actions/types";

const initialState = {
    items: [],
    page: 1,
    isLoaded: false,
};

const products = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            const newItems = action.payload;
            const { items } = state;
            return {
                ...state,
                items: [...items, ...newItems],
                isLoaded: true,
            };
        case SET_NEW_PAGE:
            return {
                ...state,
                page: state.page + 1
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
