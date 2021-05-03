import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { Howl } from "howler";

import classes from "./MessagesWrapper.module.scss";
import Spinner from "../../../UI/Spinner/Spinner";
import * as action from "../../../../store/actions";
import Message from "./Message/Message";
import MessageHeader from "./MessageHeader/MessageHeader";
import MessageInput from "./MessageInput/MessageInput";
import messageSound from "../../../../assets/sounds/messagefx.mp3";

const messageFx = new Howl({
  src: [messageSound],
  loop: false,
  preload: true,
});

const MessagesWrapper = ({
  chatId,
  onCloseChat,
  fromUser,
  user,
  onCallToInit,
}) => {
  const LIMIT = 15;
  const [page, setPage] = useState(0);
  const [hasMoreMessages, sethasMoreMessages] = useState(true);
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.currentChats);
  const totalMesages = useSelector((state) => state.chat.countMessages);
  const isTyping = useSelector((state) => state.chat.isTyping);
  const fromUserId = fromUser.id;

  useEffect(() => {
    dispatch(action.fetchMessages(chatId, fromUserId, 0, LIMIT));

    return () => {
      dispatch(action.cleanUpMessages());
    };
  }, [dispatch, chatId, LIMIT, fromUserId]);

  useEffect(() => {
    if (messages.length > 0) dispatch(action.seeNewMessage(chatId));
    return () => {
      if (messages.length > 0) dispatch(action.seeNewMessage(chatId));
    };
  }, [dispatch, chatId, messages]);

  const handleLoadAnotherMessages = () => {
    setPage(page + 1);
    if (messages.length >= totalMesages) {
      sethasMoreMessages(false);
      return;
    }
    dispatch(action.fetchMessages(chatId, fromUserId, page + 1, LIMIT));
  };

  MessagesWrapper.propTypes = {
    chatId: PropTypes.number,
    onCloseChat: PropTypes.func,
    fromUser: PropTypes.object,
    user: PropTypes.object,
    onCallToInit: PropTypes.func,
  };
  return (
    <div className={classes.MessagesWrapper}>
      <MessageHeader
        onCloseChat={onCloseChat}
        user={fromUser}
        onCallToInit={onCallToInit}
      />
      <div className={classes.MessagesWrapper_container}>
        <InfiniteScroll
          dataLength={messages.length}
          next={handleLoadAnotherMessages}
          hasMore={hasMoreMessages}
          height={530}
          style={{ display: "flex", flexDirection: "column-reverse" }}
          inverse={true}
          loader={messages.length > 0 && <Spinner />}
        >
          {messages.length > 0 ? (
            messages.map((message, i) => (
              <Message key={i} message={message} userId={user.id} />
            ))
          ) : (
            <p>No messages</p>
          )}
        </InfiniteScroll>
      </div>

      <div className={classes.MessagesWrapper_isTyping}>
        {isTyping && <Spinner type="beat" />}
      </div>
      <div className={classes.MessagesWrapper_input}>
        <MessageInput user={user} toUserId={fromUserId} chatId={chatId} />
      </div>
    </div>
  );
};

export default MessagesWrapper;
