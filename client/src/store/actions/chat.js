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
          chat.Messages.reverse()
        });
        dispatch(fetchChatDataSuccess(data));
      })
      .catch((err) => dispatch(errorCreator(err.response)));
  };
};
