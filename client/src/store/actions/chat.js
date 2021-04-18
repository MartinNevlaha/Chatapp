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

export const fetchMessagesStart = () => {
  return {
    type: actionTypes.FETCH_MESSAGES_START,
  };
};

export const fetchMessagesSuccess = (messagesData) => {
  return {
    type: actionTypes.FETCH_MESSAGES_SUCCESS,
    messagesData,
  };
};

export const fetchMessagesFailed = () => {
  return {
    type: actionTypes.FETCH_MESSAGES_FAILED,
  };
};

export const fetchMessages = (chatId, userId, page) => {
  return (dispatch) => {
    dispatch(fetchMessagesStart());
    axios.get(
      `/api/chat/messages?chatId=${chatId}&userId=${userId}&page=${page}`
    ).then(res => {
      const messagesData = {
        messages: res.data.messages,
        count: res.data.count
      }
      dispatch(fetchMessagesSuccess(messagesData));
    }).catch(err => dispatch(errorCreator(err.message)))
  };
};
