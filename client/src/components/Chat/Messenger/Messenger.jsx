import React, { useState } from "react";
import PropTypes from "prop-types";

import classes from "./Messenger.module.scss";
import SearchInput from "../../Inputs/SearchInputs/SearchInputs";
import Spinner from "../../UI/Spinner/Spinner";
import ChatItem from "./ChatItem/ChatItem";
import MessagesWrapper from "./MessagesWrapper/MessagesWrapper";
import { searchMsgHelper } from "../../../utils/utilities";
import Modal from "../../UI/Modal/Modal";
import Button from "../../UI/Button/Button";
import { deleteChat } from "../../../store/actions";

const Messenger = ({ chatData, loadingChatData, user, onDeleteChat }) => {
  const [openedChatId, setOpenedChatId] = useState(null);
  const [searchMessageValue, setSearchMessageValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [choosenChatId, setChoosenChatId] = useState(null);

  const handleOpenChat = (chatId) => {
    setOpenedChatId(chatId);
  };

  const handleCloseChat = () => {
    setOpenedChatId(null);
  };

  const messageFromUser = (chatData) => {
    const currentChat = chatData.filter((chat) => chat.id === openedChatId);
    return currentChat[0].Users[0];
  };

  const handleOpenModal = (chatId) => {
    setShowModal(true);
    setChoosenChatId(chatId);
  };

  const handleDeleteChat = () => {
    const deletedChat = chatData.filter((chat) => chat.id === choosenChatId)[0];
    onDeleteChat(choosenChatId, deletedChat);
    setShowModal(false);
  };

  let content = searchMsgHelper(chatData, searchMessageValue).map((chat) => (
    <ChatItem
      userId={user.id}
      key={chat.id}
      chat={chat}
      onOpenChat={handleOpenChat}
      openModal={handleOpenModal}
    />
  ));

  if (loadingChatData) {
    content = <Spinner />;
  } else if (openedChatId) {
    content = (
      <MessagesWrapper
        chatId={openedChatId}
        onCloseChat={handleCloseChat}
        fromUser={messageFromUser(chatData)}
        user={user}
      />
    );
  }

  Messenger.propTypes = {
    chatData: PropTypes.array,
    loadingChatData: PropTypes.bool,
    user: PropTypes.object,
    onDeleteChat: PropTypes.func,
  };

  return (
    <React.Fragment>
      <Modal show={showModal} cancel={() => setShowModal(false)}>
        <p>Do you want to delete this chat</p>
        <div>
          <Button danger clicked={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button clicked={handleDeleteChat}>Ok</Button>
        </div>
      </Modal>
      <div className={classes.messenger}>
        <div className={classes.messenger_header}>
          <h2>Messenger</h2>
          <div className={classes.messenger_header_input}>
            <SearchInput
              styleType="large"
              currentValue={searchMessageValue}
              onChangeInput={(e) => setSearchMessageValue(e.target.value)}
            />
          </div>
        </div>
        <div className={classes.messenger_chats}>{content}</div>
      </div>
    </React.Fragment>
  );
};

export default Messenger;
