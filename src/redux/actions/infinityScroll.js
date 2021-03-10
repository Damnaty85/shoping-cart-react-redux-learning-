import {LOAD_MORE_PRODUCTS} from "./types";

export const loadMoreItems = (page) => ({
    type: LOAD_MORE_PRODUCTS,
    payload: page,
});
