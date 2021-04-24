import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";

import classes from "./ChatItem.module.scss";
import { parseDateTime } from "../../../../utils/utilities";
import LazyImage from "../../../UI/LazyImage/LazyImage";
import StatusDot from "../../../UI/StatusDot/StatusDot";
import { unreadMessages } from "../../../../utils/utilities";

const ChatItem = ({ chat, onOpenChat, userId }) => {
  ChatItem.propTypes = {
    onOpenChat: PropTypes.func,
    userId: PropTypes.number,
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
      LastReadMessages: PropTypes.array,
    }),
  };

  return (
    <div className={classes.chatItem}>
      <div className={classes.chatItem_header}>
        <div className={classes.chatItem_header_friends}>
          <h2>Message from</h2>
          {chat.Users.map((user) => (
            <div key={user.id} className={classes.chatItem_header_friends_user}>
              <h4>{user.fullName}</h4>
              <StatusDot status={user.status} />
            </div>
          ))}
        </div>
        <div className={classes.chatItem_header_newMessage}>
          {unreadMessages(userId, chat.LastReadMessages, chat.Messages)
            .hasUnreadMessages ? (
            <div className={classes.chatItem_header_newMessage_yes}>
              <p>New message</p>
              <div className={classes.chatItem_header_newMessage_yes_number}>
                <p>
                  {
                    unreadMessages(userId, chat.LastReadMessages, chat.Messages)
                      .numberOfUnreadMessages
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className={classes.chatItem_header_newMessage_no}>
              <p>No new messages</p>
            </div>
          )}
        </div>
      </div>
      <div
        className={classes.chatItem_lastMessage}
        onClick={() => onOpenChat(chat.id)}
        data-tip
        data-for="lastMessage"
      >
        <h2>Last message</h2>
        {!chat.Messages[chat.Messages.length - 1] ? (
          <p>No message content</p>
        ) : (
          <div className={classes.chatItem_lastMessage_content}>
            {chat.Messages[chat.Messages.length - 1].type === "text" ? (
              <p>{chat.Messages[chat.Messages.length - 1].message}</p>
            ) : (
              <div className={classes.chatItem_lastMessage_content_image}>
                <LazyImage
                  image={{
                    src: chat.Messages[chat.Messages.length - 1].message,
                    alt: "chatImage",
                  }}
                />
              </div>
            )}
            <p>
              Send:{" "}
              {parseDateTime(chat.Messages[chat.Messages.length - 1].createdAt)}
            </p>
          </div>
        )}
      </div>
      <ReactTooltip id="lastMessage" place="top" effect="solid" border={true}>
        Click to open chat
      </ReactTooltip>
      <div className={classes.chatItem_delete}>
        <FontAwesomeIcon
          icon={faTrashAlt}
          size="1x"
          className={classes.chatItem_delete_icon}
          data-tip
          data-for="deleteChat"
        />
        <ReactTooltip id="deleteChat" place="top" effect="solid" border={true}>
          Click to delete chat
        </ReactTooltip>
      </div>
    </div>
  );
};

export default ChatItem;
