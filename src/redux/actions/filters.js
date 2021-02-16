import {SET_CATEGORY, SET_SORT_BY} from "./types";

export const setCategory = (evt) => ({
    type: SET_CATEGORY,
    payload: evt.target.value,
});


export const setSortBy = ({ type, order }) => ({
    type: SET_SORT_BY,
    payload: { type, order },
});
