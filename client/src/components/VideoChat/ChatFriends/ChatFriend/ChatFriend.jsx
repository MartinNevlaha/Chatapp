import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

import classes from "./ChatFriend.module.scss";
import Friend from "../../../FriendList/Friend/Friend";
import Button from "../../../UI/Button/Button";
import StatusDot from "../../../UI/StatusDot/StatusDot";

const ChatFriend = ({ friend, isInChat, onAddToChat, callToFriend }) => {
  ChatFriend.propTypes = {
    friend: PropTypes.object,
    isInChat: PropTypes.bool,
    onAddToChat: PropTypes.func,
    callToFriend: PropTypes.func,
  };
  return (
    <div className={classes.chatFriend}>
      <Friend friend={friend} />
      <StatusDot status={friend.status} statusShow />
      <FontAwesomeIcon
        icon={faVideo}
        className={classes.chatFriend_videoIcon}
        onClick={() => callToFriend(friend.id)}
      />
      <Button disabled={isInChat} clicked={() => onAddToChat(friend.id)}>
        Add to chat
      </Button>
    </div>
  );
};

export default ChatFriend;
