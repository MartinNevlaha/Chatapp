import { updateObj } from "../../utils/utilities";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  error: null,
  success: null,
};

const errorCreated = (state, action) => {
  return updateObj(state, { error: action.error });
};

const hideError = (state, action) => {
  return updateObj(state, { error: null });
};

const successCreated = (state, action) => {
  return updateObj(state, { success: action.message });
};

const hideSuccess = (state, action) => {
  return updateObj(state, { success: null });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_ERROR:
      return errorCreated(state, action);
    case actionTypes.HIDE_REQUEST_ERROR:
      return hideError(state, action);
    case actionTypes.REQUEST_SUCCESS:
      return successCreated(state, action);
    case actionTypes.HIDE_REQUEST_SUCCESS:
      return hideSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
