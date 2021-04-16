import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../utils/utilities";

const initialState = {
  chatData: [],
  currentChats: [],
  loadingChatData: false,
};

const fetchChatDataStart = (state, action) => {
  return updateObj(state, { loadingChatData: true });
};

const fetchChatDataSuccess = (state, action) => {
  return updateObj(state, {
    loadingChatData: false,
    chatData: action.chatData,
  });
};

const fetchChatDataFailed = (state, action) => {
  return updateObj(state, {
    loadingChatData: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CHAT_DATA_START:
      return fetchChatDataStart(state, action);
    case actionTypes.FETCH_CHAT_DATA_SUCCESS:
      return fetchChatDataSuccess(state, action);
    case actionTypes.FETCH_CHAT_DATA_FAILED:
      return fetchChatDataFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
