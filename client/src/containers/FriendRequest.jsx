import React from "react";
import { useSelector, useDispatch } from "react-redux";

import * as action from "../store/actions";
import FriendRequestComponent from "../components/FriendRequest/FriendRequests";

const FriendRequest = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.friendRequest.requests);

  const handleFriendRequest = (requestId, decision) => {
    const answer = {
      answer: decision
    }
    dispatch(action.answerFriendRequest(requestId, answer))
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-around",
        flexWrap: "wrap",
      }}
    >
      <FriendRequestComponent
        pendingRequests={requests}
        handleFriendRequest={handleFriendRequest}
      />
    </div>
  );
};

export default FriendRequest;
