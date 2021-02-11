import { updateObj } from "../../utils/utilities";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
    error: null
}

const errorCreated = (state, action) => {
    return updateObj(state, {error: action.error})
}

const hideError = (state, action) => {
    return updateObj(state, {error: null})
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.REQUEST_ERROR:
            return errorCreated(state, action);
        case actionTypes.HIDE_REQUEST_ERROR:
            return hideError(state, action);
        default:
            return state;
    }
}

export default reducer;