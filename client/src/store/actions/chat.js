import * as actionTypes from "./actionTypes";
import axios from "../../api/axios";
import { errorCreator } from "./requestStatus";

export const fetchChatDataStart = () => {
  return {
    type: actionTypes.FETCH_CHAT_DATA_START,
  };
};

export const fetchChatDataSuccess = (chatData) => {
  return {
    type: actionTypes.FETCH_CHAT_DATA_SUCCESS,
    chatData,
  };
};

export const fetchChatDataFailed = () => {
  return {
    type: actionTypes.FETCH_CHAT_DATA_FAILED,
  };
};

export const fetchChatData = () => {
  return (dispatch) => {
    dispatch(fetchChatDataStart());
    axios
      .get("/api/chat")
      .then((res) => {
        let data = res.data.chatsData;

        data.forEach((chat) => {
          chat.Users.forEach((user) => (user.status = "offline"));
          chat.Messages.reverse();
        });
        dispatch(fetchChatDataSuccess(data));
      })
      .catch((err) => dispatch(errorCreator(err.response)));
  };
};

export const fetchMessagesSuccess = (messages, count) => {
  return {
    type: actionTypes.FETCH_MESSAGES_SUCCESS,
    messages,
    count,
  };
};


export const fetchMessages = (chatId, userId, page, limit) => {
  return (dispatch) => {
    axios
      .get(
        `/api/chat/messages?chatId=${chatId}&userId=${userId}&page=${page}&limit=${limit}`
      )
      .then((res) => {
        dispatch(fetchMessagesSuccess(res.data.messages, res.data.count));
      })
      .catch((err) => {
        dispatch(errorCreator(err.message));
      });
  };
};

export const cleanUpMessages = () => {
  return {
    type: actionTypes.CLEAN_UP_MESSAGES,
  };
};

export const setSocket = (socket) => {
  return {
    type: actionTypes.SET_SOCKET,
    socket,
  };
};
