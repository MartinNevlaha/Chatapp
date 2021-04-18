import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";

import classes from "./Messages.module.scss";
import * as action from "../../../../store/actions";

const Messages = ({ chatId, onCloseChat, fromUserId }) => {
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(action.fetchMessages(chatId, fromUserId, 0));

    return () => {
    }
  }, [dispatch])

  Messages.propTypes = {
    chatId: PropTypes.number,
    onCloseChat: PropTypes.func,
    fromUserId: PropTypes.number.isRequired
  }
  return <div className={classes.messages}>
    <div className={classes.messages_close} onClick={onCloseChat}>
      <FontAwesomeIcon icon={faChevronLeft} />
      <p>Back</p>
    </div>
    <div className={classes.messages_container}>
    ...messages
    </div>
    <div className={classes.messages_input}>
      ...input
    </div>
  </div>;
};

export default Messages;
