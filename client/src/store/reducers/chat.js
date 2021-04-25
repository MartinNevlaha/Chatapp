import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../utils/utilities";

const initialState = {
  chatData: [],
  currentChats: [],
  countMessages: null,
  imageUploadProgress: 0,
  scrollBottom: 0,
  loadingChatData: false,
  socket: null,
  isTyping: false,
  muteSound: false,
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

const fetchMessagesSuccess = (state, action) => {
  return updateObj(state, {
    countMessages: action.count,
    currentChats: [...state.currentChats, ...action.messages],
  });
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

const setSocket = (state, action) => {
  return updateObj(state, { socket: action.socket });
};

const sendMessage = (state, action) => {
  const index = state.chatData.findIndex(
    (chat) => chat.id === action.message.chatId
  );
  const copyChatData = [...state.chatData];
  const updatedMessages = [...copyChatData[index].Messages, action.message];
  copyChatData[index].Messages = updatedMessages;

  return updateObj(state, {
    chatData: copyChatData,
    currentChats: [action.message, ...state.currentChats],
  });
};

const receiveMessage = (state, action) => {
  const index = state.chatData.findIndex(
    (chat) => chat.id === action.message.chatId
  );
  const copyChatData = [...state.chatData];
  const updatedMessages = [...copyChatData[index].Messages, action.message];
  copyChatData[index].Messages = updatedMessages;

  return updateObj(state, {
    chatData: copyChatData,
    currentChats: [action.message, ...state.currentChats],
  });
};

const imageUploadProgress = (state, action) => {
  return updateObj(state, {
    imageUploadProgress: action.progress,
  });
};

const imageUploadSuccess = (state, action) => {
  return updateObj(state, { imageUploadProgress: 0 });
};

const imageUploadFailed = (state, action) => {
  return updateObj(state, { imageUploadProgress: 0 });
};

const seeNewMessageSuccess = (state, action) => {
  const indexOfChat = state.chatData.findIndex(
    (chat) => chat.id === action.messageData.chatId
  );
  const indexOfLastReadMessage = state.chatData[
    indexOfChat
  ].LastReadMessages.findIndex(
    (mess) => mess.userId === action.messageData.userId
  );
  const copyOfChatData = [...state.chatData];
  copyOfChatData[indexOfChat].LastReadMessages[indexOfLastReadMessage] =
    action.messageData;
  return updateObj(state, { chatData: copyOfChatData });
};

const userTyping = (state, action) => {
  return updateObj(state, { isTyping: action.isTyping });
};

const deleteChatSuccess = (state, action) => {
  return updateObj(state, {
    chatData: state.chatData.filter((chat) => chat.id !== action.chatId),
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
    case actionTypes.FETCH_MESSAGES_SUCCESS:
      return fetchMessagesSuccess(state, action);
    case actionTypes.CLEAN_UP_MESSAGES:
      return cleanUpMessages(state, action);
    case actionTypes.FRIEND_ONLINE:
      return onlineChatFriends(state, action);
    case actionTypes.FRIEND_OFFLINE:
      return offlineChatFriend(state, action);
    case actionTypes.SET_SOCKET:
      return setSocket(state, action);
    case actionTypes.SEND_MESSAGE:
      return sendMessage(state, action);
    case actionTypes.RECEIVE_MESSAGE:
      return receiveMessage(state, action);
    case actionTypes.IMAGE_UPLOAD_PROGRESS:
      return imageUploadProgress(state, action);
    case actionTypes.IMAGE_UPLOAD_SUCCESS:
      return imageUploadSuccess(state, action);
    case actionTypes.IMAGE_UPLOAD_FAILED:
      return imageUploadFailed(state, action);
    case actionTypes.SEE_NEW_MESSAGE_SUCCESS:
      return seeNewMessageSuccess(state, action);
    case actionTypes.USER_IS_TYPING:
      return userTyping(state, action);
    case actionTypes.DELETE_CHAT_SUCCES:
      return deleteChatSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
