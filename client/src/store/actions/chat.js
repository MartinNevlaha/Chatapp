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

export const sendMessage = (message) => {
  console.log(message);
  return {
    type: actionTypes.SEND_MESSAGE,
    message,
  };
};

export const receiveMessage = (message) => {
  return {
    type: actionTypes.RECEIVE_MESSAGE,
    message,
  };
};

export const imageUploadProgress = (progress) => {
  return {
    type: actionTypes.IMAGE_UPLOAD_PROGRESS,
    progress,
  };
};

export const imageUploadSuccess = () => {
  return {
    type: actionTypes.IMAGE_UPLOAD_SUCCESS,
  };
};

export const imageUploadFailed = () => {
  return {
    type: actionTypes.IMAGE_UPLOAD_FAILED,
  };
};

export const imageChatUpload = (imageData, sendMessage, chatId) => {
  return (dispatch) => {
    const config = {
      onUploadProgress: (progressEvent) => {
        let percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        if (percentCompleted !== null || percentCompleted !== 0) {
          dispatch(imageUploadProgress(percentCompleted));
        }
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    axios
      .post(`/api/chat/upload-image/${chatId}`, imageData, config)
      .then((res) => {
        dispatch(imageUploadSuccess());
        sendMessage(true, res.data.imageUrl, res.data.imageUrlForSendEvent);
      })
      .catch((err) => dispatch(errorCreator(err.response)));
  };
};

export const seeNewMessageSuccess = (messageData) => {
  return {
    type: actionTypes.SEE_NEW_MESSAGE_SUCCESS,
    messageData,
  };
};

export const seeNewMessage = (chatId) => {
  return (dispatch) => {
    axios
      .patch(`/api/chat/see-message/${chatId}`)
      .then((res) => dispatch(seeNewMessageSuccess(res.data.lastMessage)))
      .catch((err) => dispatch(errorCreator(err.response)));
  };
};

export const userTyping = (isTyping) => {
  return {
    type: actionTypes.USER_IS_TYPING,
    isTyping,
  };
};

export const deleteChatSuccess = (chatId) => {
  return {
    type: actionTypes.DELETE_CHAT_SUCCES,
    chatId,
  };
};

export const deleteChat = (chatId) => {
  return (dispatch) => {
    axios
      .delete(`/api/chat/delete/${chatId}`)
      .then((res) => dispatch(deleteChatSuccess(chatId)))
      .catch((err) => dispatch(errorCreator(err.response)));
  };
};

export const addToChatSuccess = (chatData) => {
  console.log(chatData);
  return {
    type: actionTypes.ADD_TO_CHAT_SUCCESS,
    chatData,
  };
};

export const addToChat = (friendData) => {
  return (dispatch) => {
    axios
      .post("/api/chat/create", friendData)
      .then((res) => dispatch(addToChatSuccess(res.data.chat)))
      .catch((err) => dispatch(errorCreator(err.response)));
  };
};
