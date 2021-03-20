import React from "react";

import classes from "./FriendRequest.module.scss";
import Button from "../UI/Button/Button";
import { parseDateTime } from "../../utils/utilities";

const FriendRequests = ({pendingRequests, handleFriendRequest}) => {
  return (
    <div className={classes.friendRequest}>
      <div className={classes.friendRequest_header}>
        <h2>Friend request list</h2>
      </div>
      <div className={classes.friendRequest_request}>
        {pendingRequests.map((request) => {
          return (
            <div
              className={classes.friendRequest_request_container}
              key={request.id}
            >
              <div
                className={classes.friendRequest_request_container_avatar}
              >
                <img src={request.requestor.avatar} alt="avatar"/>
              </div>
              <div className={classes.friendRequest_request_container_info}>
                <h3>{request.requestor.fullName}</h3>
                <p>Request was send: {parseDateTime(request.createdAt)}</p>
              </div>
              <div className={classes.friendRequest_request_container_button}>
                <Button type="button" danger={true} clicked={() => handleFriendRequest(request.id, 2)}>Reject</Button>
                <Button type="button" clicked={() => handleFriendRequest(request.id, 1)}>Accept</Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FriendRequests;
