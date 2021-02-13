import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../utils/utilities";

const initialState = {
  userId: null,
  firstName: "",
  lastName: "",
  fullName: "",
  role: "",
  token: null,
  registered: false,
  loading: false,
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
  })
}
const loginSuccess = (state, action) => {
  return updateObj(state, {
    userId: action.userId,
    firstName: action.firstName,
    lastName: action.lastName,
    fullName: action.fullName,
    role: action.role,
    token: action.token,
    loading: false
  })
}

const loginFailed = (state, action) => {
  return updateObj(state, {
    loading: false
  })
}

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
    default:
      return state;
  }
};

export default reducer;