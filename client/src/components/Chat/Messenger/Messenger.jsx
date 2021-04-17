import React from "react";
import PropTypes from "prop-types";

import classes from "./Messenger.module.scss";
import SearchInput from "../../Inputs/SearchInputs/SearchInputs";
import Spinner from "../../UI/Spinner/Spinner";
import ChatItem from "./ChatItem/ChatItem";

const Messenger = ({ chatData, loadingChatData }) => {
  Messenger.propTypes = {
    chatData: PropTypes.array,
    loadingChatData: PropTypes.bool,
  };
  return (
    <div className={classes.messenger}>
      <div className={classes.messenger_header}>
        <h2>Messenger</h2>
        <div className={classes.messenger_header_input}>
          <SearchInput styleType="large" />
        </div>
      </div>
      <div className={classes.messenger_chats}>
        {loadingChatData ? (
          <Spinner />
        ) : (
          chatData.map((chat) => <ChatItem key={chat.id} chat={chat} />)
        )}
      </div>
    </div>
  );
};

export default Messenger;
