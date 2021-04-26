import React from "react";
import PropTypes from "prop-types";

import classes from "./ChatFriend.module.scss";
import Friend from "../../../FriendList/Friend/Friend";
import Button from "../../../UI/Button/Button";
import StatusDot from "../../../UI/StatusDot/StatusDot";

const ChatFriend = ({ friend, isInChat, onAddToChat }) => {
  ChatFriend.propTypes = {
    friend: PropTypes.object,
    isInChat: PropTypes.bool,
    onAddToChat: PropTypes.func,
  };
  return (
    <div className={classes.chatFriend}>
      <Friend friend={friend} />
      <div className={classes.chatFriend_status}>
        <span className={classes.chatFriend_dot}></span>
        <StatusDot status={friend.status} statusShow />
      </div>
      <Button disabled={isInChat} clicked={() => onAddToChat(friend.id)}>
        Add to chat
      </Button>
    </div>
  );
};

export default ChatFriend;
