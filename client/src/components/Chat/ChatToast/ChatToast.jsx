import React from 'react'

import classes from "./ChatToast.module.scss";
import chatImage from "../../../assets/images/chat.svg";

const ChatToast = () => {
  return (
    <div className={classes.chatToast}>
      <div className={classes.chatToast_wrapper}>
      <img src={chatImage} alt="chatImage" />
      </div>
    </div>
  )
}

export default ChatToast
