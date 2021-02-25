import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../utils/utilities";

const initialState = {
  user: {},
  token: null,
  isLogged: false,
  registered: false,
  loading: false,
  activated: false,
};

const registerStart = (state, action) => {
  return updateObj(state, {
    loading: true,
    registered: false,
  });
};

const registerSuccess = (state, action) => {
  return updateObj(state, {
    registered: action.registered,
    loading: false,
  });
};

const registerFailed = (state, action) => {
  return updateObj(state, { loading: false, registered: false });
};

const loginStart = (state, action) => {
  return updateObj(state, {
    loading: true,
  });
};
const loginSuccess = (state, action) => {
  return updateObj(state, {
    user: action.userData,
    token: action.token,
    isLogged: true,
    loading: false,
  });
};

const loginFailed = (state, action) => {
  return updateObj(state, {
    loading: false,
    isLogged: false
  });
};

const emailActivStart = (state, action) => {
  return updateObj(state, {
    loading: true,
    activated: false,
  });
};

const emailActivSuccess = (state, action) => {
  return updateObj(state, {
    loading: false,
    activated: action.activated,
  });
};

const emailActivFailed = (state, action) => {
  return updateObj(state, {
    loading: false,
    activated: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_START:
      return registerStart(state, action);
    case actionTypes.REGISTER_SUCCESS:
      return registerSuccess(state, action);
    case actionTypes.REGISTER_FAILED:
      return registerFailed(state, action);
    case actionTypes.LOGIN_START:
      return loginStart(state, action);
    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case actionTypes.LOGIN_FAILED:
      return loginFailed(state, action);
    case actionTypes.EMAIL_ACTIV_START:
      return emailActivStart(state, action);
    case actionTypes.EMAIL_ACTIV_SUCCESS:
      return emailActivSuccess(state, action);
    case actionTypes.EMAIL_ACTIV_FAILED:
      return emailActivFailed(state, action);
    case actionTypes.RESET_AUTH_STATUS:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
