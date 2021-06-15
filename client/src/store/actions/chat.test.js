import * as actionTypes from "./actionTypes";
import { fetchChatDataStart } from "./chat";

describe("fetch chat data", () => {
  test("should return action with type FETCH_CHAT_DATA_START", () => {
    const action = fetchChatDataStart();
    expect(action).toStrictEqual({ type: actionTypes.FETCH_CHAT_DATA_START });
  });
});
