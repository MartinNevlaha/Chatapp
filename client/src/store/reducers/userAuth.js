import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../utils/utilities";

const initialState = {
  userId: null,
  firstName: "",
  lastName: "",
  role: "",
  token: null,
  registered: false,
  loading: true,
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_START:
      return registerStart(state, action);
    case actionTypes.REGISTER_SUCCESS:
      return registerSuccess(state, action);
    case actionTypes.REGISTER_FAILED:
      return registerFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
