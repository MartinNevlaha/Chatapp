import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";

import classes from "./ChatItem.module.scss";
import StatusDot from "../../../UI/StatusDot/StatusDot";
import { parseDateTime } from "../../../../utils/utilities";
import LazyImage from "../../../UI/LazyImage/LazyImage";

const ChatItem = ({ chat, onOpenChat }) => {
  ChatItem.propTypes = {
    onOpenChat: PropTypes.func,
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
        <h2>Message from</h2>
        {chat.Users.map((user) => (
          <div key={user.id} className={classes.chatItem_friendsHeader_user}>
            <h4>{user.fullName}</h4>
            <StatusDot status={user.status} />
          </div>
        ))}
      </div>
      <div
        className={classes.chatItem_lastMessage}
        onClick={() => onOpenChat(chat.id)}
        data-tip
        data-for="lastMessage"
      >
        <h2>Last message</h2>
        {chat.Messages.length === 0 ? (
          <p>No message content</p>
        ) : (
          <div className={classes.chatItem_lastMessage_content}>
            {chat.Messages[0].message.type === "text" ? (
              <p>{chat.Messages[0].message}</p>
            ) : (
              <div className={classes.chatItem_lastMessage_content_image}>
                <LazyImage
                  image={{ src: chat.Messages[0].message, alt: "chatImage" }}
                />
              </div>
            )}
            <p>Send: {parseDateTime(chat.Messages[0].createdAt)}</p>
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
