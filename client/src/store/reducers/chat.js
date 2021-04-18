import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../utils/utilities";

const initialState = {
  chatData: [],
  currentChats: {},
  loadingChatData: false,
  loadingMessages: false,
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

const fetchMessagesStart = (state, action) => {
  return updateObj(state, {
    loadingMessages: true,
  });
};

const fetchMessagesSuccess = (state, action) => {
  console.log(action.messagesData);
  return updateObj(state, {
    loadingMessages: false,
    currentChats: action.messagesData,
  });
};

const fetchMessagesFailed = (state, action) => {
  return updateObj(state, { loadingMessages: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CHAT_DATA_START:
      return fetchChatDataStart(state, action);
    case actionTypes.FETCH_CHAT_DATA_SUCCESS:
      return fetchChatDataSuccess(state, action);
    case actionTypes.FETCH_CHAT_DATA_FAILED:
      return fetchChatDataFailed(state, action);
    case actionTypes.FETCH_MESSAGES_START:
      return fetchMessagesStart(state, action);
    case actionTypes.FETCH_MESSAGES_SUCCESS:
      return fetchMessagesSuccess(state, action);
    case actionTypes.FETCH_MESSAGES_FAILED:
      return fetchMessagesFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
