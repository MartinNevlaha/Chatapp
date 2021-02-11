import * as actionTypes from "./actionTypes";
import axios from '../../axios';
import {errorCreator} from "./errorActionCreator";

export const registerStart = () => {
    return {
        type: actionTypes.REGISTER_START
    }
}

export const registerSucces = (decodedToken, token) => {
    return {
        type: actionTypes.REGISTER_SUCCES
    }
}

export const registerUser = (data) => {
    return dispatch => {
        dispatch(registerStart());
        axios.post("/api/users/register", data)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
}