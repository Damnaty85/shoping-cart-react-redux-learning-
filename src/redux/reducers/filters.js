import {SET_CATEGORY, SET_SORT_BY} from "../actions/types";

const initialState = {
    categoryKey: "",
    categoryValue:"",
    sortBy: {
        type: 'id',
        order: 'desc',
    },
};

const filters = (state = initialState, action) => {
    if (action.type === SET_CATEGORY) {
        return {
            ...state,
            categoryKey: action.payload.parentElement.previousElementSibling.textContent,
            categoryValue: action.payload.textContent
        };
    }
    if (action.type === SET_SORT_BY) {
        return {
            ...state,
            sortBy: action.payload,
        };
    }
    return state;
};

export default filters;
