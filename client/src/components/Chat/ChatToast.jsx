import React from 'react'
import PropTypes from "prop-types";

import classes from "./ChatToast.module.scss";
import chatImage from "../../assets/images/chat.svg";

const ChatToast = ({onOpenChatMenu}) => {

  ChatToast.propTypes = {
    onOpenChatMenu: PropTypes.func
  }

  return (
    <div className={classes.chatToast} onClick={onOpenChatMenu}>
      <div className={classes.chatToast_wrapper}>
      <img src={chatImage} alt="chatImage" />
      </div>
    </div>
  )
}

export default ChatToast
