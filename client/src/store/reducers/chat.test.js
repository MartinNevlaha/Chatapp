import * as actionTypes from "../actions/actionTypes";
import chatReducer from "./chat";

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

test("when previos state is undefined return initalState", () => {
  const newState = chatReducer(undefined, {});
  expect(newState).toStrictEqual(initialState);
});

test("return initialState when action type is undefined", () => {
  const newState = chatReducer(initialState, { type: "unknown" });
  expect(newState).toStrictEqual(initialState);
});

test("return true for loadingChatData when actionTypes is FETCH_CHAT_DATA_START", () => {
  const newState = chatReducer(initialState, {
    type: actionTypes.FETCH_CHAT_DATA_START,
  });
  expect(newState).toStrictEqual({
    chatData: [],
    currentChats: [],
    countMessages: null,
    imageUploadProgress: 0,
    scrollBottom: 0,
    loadingChatData: true,
    socket: null,
    isTyping: false,
    muteSound: false,
  });
});
