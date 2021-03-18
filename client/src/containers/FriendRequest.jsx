import React from "react";
import { useSelector } from "react-redux";

import FriendRequestComponent from "../components/FriendRequest/FriendRequests";

const FriendRequest = () => {
  const requests = useSelector(state => state.friendRequest.requests);

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
      <FriendRequestComponent pendingRequests={requests} />
    </div>
  );
};

export default FriendRequest;
