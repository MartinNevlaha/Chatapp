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

const answerFriendRequestStart = (state, action) => {
  return updateObj(state, { loading: true });
};

const answerFriendRequestSuccess = (state, action) => {
  const oldState = [...state.requests];
  const updatedState = oldState.filter(
    (request) => request.id !== action.requestId
  );
  return updateObj(state, {
    loading: false,
    requests: updatedState,
  });
};

const answerFriendRequestFailed = (state, action) => {
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
    case actionTypes.ANSWER_FRIEND_REQUEST_START:
      return answerFriendRequestStart(state, action);
    case actionTypes.ANSWER_FRIEND_REQUEST_SUCCESS:
      return answerFriendRequestSuccess(state, action);
    case actionTypes.ANSWER_FRIEND_REQUEST_FAILED:
      return answerFriendRequestFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
