import React from "react";
import PropTypes from "prop-types";

import classes from "./ChatFriend.module.scss";
import Friend from "../../../FriendList/Friend/Friend";
import Button from "../../../UI/Button/Button";
import StatusDot from "../../../UI/StatusDot/StatusDot";

const ChatFriend = ({ friend }) => {
  ChatFriend.propTypes = {
    friend: PropTypes.object,
  };
  return (
    <div className={classes.chatFriend}>
      <Friend friend={friend} />
      <div className={classes.chatFriend_status}>
        <span className={classes.chatFriend_dot}></span>
        <StatusDot status={friend.status} />
      </div>
      <Button>Add to chat</Button>
    </div>
  );
};

export default ChatFriend;
