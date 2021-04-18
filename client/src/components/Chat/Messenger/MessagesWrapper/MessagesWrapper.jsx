import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import classes from "./MessagesWrapper.module.scss";
import Spinner from "../../../UI/Spinner/Spinner";
import * as action from "../../../../store/actions";
import Message from "./Message/Message";

const MessagesWrapper = ({ chatId, onCloseChat, fromUserId, userId }) => {
  const dispatch = useDispatch();
  const messages = useSelector(
    (state) => state.chat.currentChats.messages || []
  );
  const count = useSelector((state) => state.chat.currentChats.count);
  const loadingMessages = useSelector((state) => state.chat.loadingMessages);

  useEffect(() => {
    dispatch(action.fetchMessages(chatId, fromUserId, 0));

    return () => {};
  }, [dispatch]);

  MessagesWrapper.propTypes = {
    chatId: PropTypes.number,
    onCloseChat: PropTypes.func,
    fromUserId: PropTypes.number.isRequired,
    userId: PropTypes.number,
  };
  return (
    <div className={classes.MessagesWrapper}>
      <div className={classes.MessagesWrapper_back}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          onClick={onCloseChat}
          className={classes.MessagesWrapper_back_icon}
        />
        <p>Back</p>
      </div>
      <div className={classes.MessagesWrapper_container}>
        {loadingMessages ? (
          <Spinner />
        ) : (
          messages.map((message) => (
            <Message key={message.id} message={message} userId={userId} />
          ))
        )}
      </div>
      <div className={classes.MessagesWrapper_input}>...input</div>
    </div>
  );
};

export default MessagesWrapper;
