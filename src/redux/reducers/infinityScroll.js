import {LOAD_MORE_PRODUCTS} from "../actions/types";

const initialState = {
    page: 1
};

const infinityScroll = (state = initialState, action) => {
    if (action.type === LOAD_MORE_PRODUCTS) {
        return {
            ...state,
            page: state.page + 1
        }
    }
    return state;
};

export default infinityScroll;
