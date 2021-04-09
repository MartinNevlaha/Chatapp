import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import classes from "./Friend.module.scss";

const Friend = ({ friend }) => {
  return (
    <div className={classes.friend}>
      <div className={classes.friend_avatar}>
        {friend.avatar ? (
          <div className={classes.friend_avatar_image}>
            <img src={friend.avatar} alt="avatar" />
          </div>
        ) : (
          <div className={classes.friend_avatar_icon}>
            <FontAwesomeIcon icon={faUser} size="2x" />
          </div>
        )}
      </div>
      <div className={classes.friend_name}>
          <p>{friend.fullName}</p>
      </div>
    </div>
  );
};

export default Friend;
