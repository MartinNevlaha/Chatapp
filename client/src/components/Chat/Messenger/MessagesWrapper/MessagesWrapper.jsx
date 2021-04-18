import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import classes from "./MessagesWrapper.module.scss";
import Spinner from "../../../UI/Spinner/Spinner";
import * as action from "../../../../store/actions";

const Messages = ({ chatId, onCloseChat, fromUserId }) => {
  const dispatch = useDispatch();
  const messages = useSelector(state => state.chat.currentChats.messages);
  const count = useSelector(state => state.chat.currentChats.count)
  const loadingMessages = useSelector(state => state.chat.loadingMessages);

  useEffect(() => {
    dispatch(action.fetchMessages(chatId, fromUserId, 0));

    return () => {};
  }, [dispatch]);

  Messages.propTypes = {
    chatId: PropTypes.number,
    onCloseChat: PropTypes.func,
    fromUserId: PropTypes.number.isRequired,
  };
  return (
    <div className={classes.messages}>
      <div className={classes.messages_back}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          onClick={onCloseChat}
          className={classes.messages_back_icon}
        />
        <p>Back</p>
      </div>
      <div className={classes.messages_container}>
        {loadingMessages ? <Spinner /> : "messages"}
      </div>
      <div className={classes.messages_input}>...input</div>
    </div>
  );
};

export default Messages;
