import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../utils/utilities";

const initialState = {
  user: {},
  loading: false,
};

const fetchUserProfileStart = (state, action) => {
  return updateObj(state, { loading: true });
};

const fetchUserProfileSuccess = (state, action) => {
  return updateObj(state, { user: action.userData, loading: false });
};

const fetchUserProfileFailed = (state, action) => {
  return updateObj(state, { loading: false });
};

const updateUserProfileStart = (state, action) => {
  return updateObj(state, { loading: true });
};

const updateUserProfileSuccess = (state, action) => {
  return updateObj(state, { loading: false, user: action.userData });
};

const updateUserProfileFailed = (state, action) => {
  return updateObj(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_PROFILE_START:
      return fetchUserProfileStart(state, action);
    case actionTypes.FETCH_USER_PROFILE_SUCCESS:
      return fetchUserProfileSuccess(state, action);
    case actionTypes.FETCH_USER_PROFILE_FAILED:
      return fetchUserProfileFailed(state, action);
    case actionTypes.UPDATE_USER_PROFILE_START:
      return updateUserProfileStart(state, action);
    case actionTypes.UPDATE_USER_PROFILE_SUCCESS:
      return updateUserProfileSuccess(state, action);
    case actionTypes.UPDATE_USER_PROFILE_FAILED:
      return updateUserProfileFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
