import {SET_CATEGORY} from "./types";

export const setCategory = (evt) => ({
    type: SET_CATEGORY,
    payload: evt.target.value,
});
