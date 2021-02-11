import * as actionTypes from "./actionTypes";

export const errorCreated = (error) => {
    return {
        type: actionTypes.REQUEST_ERROR,
        error
    }
}

export const hideError = () => {
    return {
        type: actionTypes.HIDE_REQUEST_ERROR,
    }
}

export const errorCreator = (error) => {
    return dispatch => {
        dispatch(errorCreated(error));
        dispatch(setTimeout(hideError(), 2500))
    }
}