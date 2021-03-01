import {SET_FILTER, CLEAR_FILTER, SET_SORT_BY} from "../actions/types";

const initialState = {
    categoryKey: "",
    categoryValue:"",
    sortBy: {
        type: 'id',
        order: 'desc',
    },
};

const filters = (state = initialState, action) => {
    if (action.type === SET_FILTER) {
        return {
            ...state,
            categoryKey: action.payload.parentElement.previousElementSibling.textContent,
            categoryValue: action.payload.textContent
        };
    }
    if (action.type === CLEAR_FILTER) {
        return {
            categoryKey: "",
            categoryValue: "",
            sortBy: {
                type: 'id',
                order: 'desc',
            },
        }
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
