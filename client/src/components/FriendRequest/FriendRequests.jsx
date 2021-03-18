import React from "react";

import classes from "./FriendRequest.module.scss";
import Button from "../UI/Button/Button";
import { parseDateTime } from "../../utils/utilities";

const FriendRequests = ({ pendingRequests }) => {
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
                <img src={request.User.avatar} alt="avatar"/>
              </div>
              <div className={classes.friendRequest_request_container_info}>
                <h3>{request.User.fullName}</h3>
                <p>Request was send: {parseDateTime(request.createdAt)}</p>
              </div>
              <div className={classes.friendRequest_request_container_button}>
                <Button type="button" danger={true} >Reject</Button>
                <Button type="button" >Accept</Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FriendRequests;
