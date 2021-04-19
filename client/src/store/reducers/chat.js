import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../utils/utilities";
import updateArray from "react-addons-update";

const initialState = {
  chatData: [],
  currentChats: [],
  countMessages: null,
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
  return updateObj(state, {
    loadingMessages: false,
    countMessages: action.count,
    currentChats: [...state.currentChats, ...action.messages],
  });
};

const fetchMessagesFailed = (state, action) => {
  return updateObj(state, { loadingMessages: false });
};

const cleanUpMessages = (state, action) => {
  return updateObj(state, { currentChats: [] });
};

const onlineChatFriends = (state, action) => {
  const chatDataCopy = [...state.chatData];
  action.friends.forEach((friend) => {
    const index = chatDataCopy.findIndex((chat) => chat.Users[0].id === friend);
    if (index !== -1) {
      chatDataCopy[index].Users[0].status = "online";
    }
  });
  return updateObj(state, { chatData: chatDataCopy });
};

const offlineChatFriend = (state, action) => {
  const chatDataCopy = [...state.chatData];
  const index = state.chatData.findIndex(
    (chat) => chat.Users[0].id === action.friend
  );
  chatDataCopy[index].Users[0].status = "offline";
  return updateObj(state, { chatData: chatDataCopy });
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
    case actionTypes.CLEAN_UP_MESSAGES:
      return cleanUpMessages(state, action);
    case actionTypes.FRIEND_ONLINE:
      return onlineChatFriends(state, action);
    case actionTypes.FRIEND_OFFLINE:
      return offlineChatFriend(state, action);
    default:
      return state;
  }
};

export default reducer;
