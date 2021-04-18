import React, { useState } from "react";
import PropTypes from "prop-types";

import classes from "./Messenger.module.scss";
import SearchInput from "../../Inputs/SearchInputs/SearchInputs";
import Spinner from "../../UI/Spinner/Spinner";
import ChatItem from "./ChatItem/ChatItem";
import MessagesWrapper from "./MessagesWrapper/MessagesWrapper";

const Messenger = ({ chatData, loadingChatData, userId }) => {
  const [openedChatId, setOpenedChatId] = useState(null);

  const handleOpenChat = (chatId) => {
    setOpenedChatId(chatId);
  };

  const handleCloseChat = () => {
    setOpenedChatId(null);
  };

  const messageFromUserId = (chatData) => {
    const currentChat = chatData.filter((chat) => chat.id === openedChatId);
    return currentChat[0].Users[0].id;
  };

  let content = chatData.map((chat) => (
    <ChatItem key={chat.id} chat={chat} onOpenChat={handleOpenChat} />
  ));

  if (loadingChatData) {
    content = <Spinner />;
  } else if (openedChatId) {
    content = (
      <MessagesWrapper
        chatId={openedChatId}
        onCloseChat={handleCloseChat}
        fromUserId={messageFromUserId(chatData)}
        userId={userId}
      />
    );
  }

  Messenger.propTypes = {
    chatData: PropTypes.array,
    loadingChatData: PropTypes.bool,
    userId: PropTypes.number
  };

  return (
    <div className={classes.messenger}>
      <div className={classes.messenger_header}>
        <h2>Messenger</h2>
        <div className={classes.messenger_header_input}>
          <SearchInput styleType="large" />
        </div>
      </div>
      <div className={classes.messenger_chats}>{content}</div>
    </div>
  );
};

export default Messenger;
