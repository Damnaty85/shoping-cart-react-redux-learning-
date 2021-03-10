import {SET_FILTER, SET_SORT_BY, CLEAR_FILTER} from "./types";

export const setFilter = (evt) => ({
    type: SET_FILTER,
    payload: evt.target,
});

export const clearFilter = () => ({
    type: CLEAR_FILTER,
});

export const setSortBy = ({ type, order }) => ({
    type: SET_SORT_BY,
    payload: { type, order },
});
