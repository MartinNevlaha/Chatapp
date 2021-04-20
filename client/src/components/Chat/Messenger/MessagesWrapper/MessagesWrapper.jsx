import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import classes from "./MessagesWrapper.module.scss";
import Spinner from "../../../UI/Spinner/Spinner";
import * as action from "../../../../store/actions";
import Message from "./Message/Message";
import MessageHeader from "./MessageHeader/MessageHeader";
import MessageInput from "./MessageInput/MessageInput";

const MessagesWrapper = ({ chatId, onCloseChat, fromUser, userId }) => {
  const LIMIT = 15;
  const [page, setPage] = useState(0);
  const [hasMoreMessages, sethasMoreMessages] = useState(true);
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.currentChats);
  const totalMesages = useSelector((state) => state.chat.countMessages);
  useEffect(() => {
    dispatch(action.fetchMessages(chatId, fromUser.id, 0, LIMIT));

    return () => {
      dispatch(action.cleanUpMessages());
    };
  }, [dispatch]);

  const handleLoadAnotherMessages = () => {
    setPage(page + 1);
    if (messages.length >= totalMesages) {
      console.log("uz nenacivam");
      sethasMoreMessages(false);
      return;
    }
    dispatch(action.fetchMessages(chatId, fromUser.id, page + 1, LIMIT));
  };

  MessagesWrapper.propTypes = {
    chatId: PropTypes.number,
    onCloseChat: PropTypes.func,
    fromUser: PropTypes.object,
    userId: PropTypes.number,
  };
  return (
    <div className={classes.MessagesWrapper}>
      <MessageHeader onCloseChat={onCloseChat} user={fromUser} />
      <div className={classes.MessagesWrapper_container}>
        <InfiniteScroll
          dataLength={messages.length}
          next={handleLoadAnotherMessages}
          hasMore={hasMoreMessages}
          height={550}
          loader={messages.length > 0 && <Spinner />}
        >
          {messages.length > 0 ? (
            messages.map((message) => (
              <Message key={message.id} message={message} userId={userId} />
            ))
          ) : (
            <p>No messages</p>
          )}
        </InfiniteScroll>
      </div>
      <div className={classes.MessagesWrapper_input}>
        <MessageInput userId={userId} toUser={fromUser} chatId={chatId} />
      </div>
    </div>
  );
};

export default MessagesWrapper;
