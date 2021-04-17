import React from "react";
import PropTypes from "prop-types";

import classes from "./ChatItem.module.scss";
import StatusDot from "../../../UI/StatusDot/StatusDot";
import { parseDateTime } from "../../../../utils/utilities";
import Button from ".././../../UI/Button/Button";

const ChatItem = ({ chat }) => {
  ChatItem.propTypes = {
    chat: PropTypes.exact({
      id: PropTypes.number,
      type: PropTypes.oneOf(["dual", "group"]),
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
      ChatUser: PropTypes.exact({
        chatId: PropTypes.number,
        userId: PropTypes.number,
        createdAt: PropTypes.string,
        updatedAt: PropTypes.string,
      }),
      Users: PropTypes.array,
      Messages: PropTypes.array,
    }),
  };
  return (
    <div className={classes.chatItem}>
      <div className={classes.chatItem_friendsHeader}>
        {chat.Users.map((user) => (
          <div key={user.id}>
            <h4>{user.fullName}</h4>
            <StatusDot status={user.status} />
          </div>
        ))}
      </div>
      <div className={classes.chatItem_lastMessage}>
        <h2>Last message</h2>
        {chat.Messages.length === 0 ? (
          <p>No message content</p>
        ) : (
          <div>
            <p>{chat.Messages[0].message}</p>
            <p>Send: {parseDateTime(chat.Messages[0].createdAt)}</p>
          </div>
        )}
      </div>
      <div className={classes.chatItem_btns}>
          <Button danger>Delete chat</Button>
      </div>
    </div>
  );
};

export default ChatItem;
