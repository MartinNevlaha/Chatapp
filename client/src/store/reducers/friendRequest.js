import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../utils/utilities";

const initialState = {
  requests: [],
  loading: false,
};

const fetchFriendRequestStart = (state, action) => {
  return updateObj(state, { loading: true });
};

const fetchFriendRequestSuccess = (state, action) => {
  return updateObj(state, {
    loading: false,
    requests: action.requests,
  });
};

const fetchFriendRequestFailled = (state, action) => {
  return updateObj(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_FRIEND_REQUEST_START:
      return fetchFriendRequestStart(state, action);
    case actionTypes.FETCH_FRIEND_REQUEST_SUCCES:
      return fetchFriendRequestSuccess(state, action);
    case actionTypes.FETCH_FRIEND_REQUEST_FAILED:
      return fetchFriendRequestFailled(state, action);
    default:
      return state;
  }
};

export default reducer;
