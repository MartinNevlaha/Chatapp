import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../utils/utilities";
import updateArray from "react-addons-update";

const initialState = {
  users: [],
  loading: false,
};

const fetchActiveUsersStart = (state, action) => {
  return updateObj(state, { loading: true });
};

const fetchActiveUsersSuccess = (state, action) => {
  return updateObj(state, {
    loading: false,
    users: action.users,
  });
};

const fetchActiveUsersFailed = (state, action) => {
  return updateObj(state, { loading: false });
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ACTIVE_USERS_START:
      return fetchActiveUsersStart(state, action);
    case actionTypes.FETCH_ACTIVE_USERS_SUCCESS:
      return fetchActiveUsersSuccess(state, action);
    case actionTypes.FETCH_ACTIVE_USERS_FAILED:
      return fetchActiveUsersFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
