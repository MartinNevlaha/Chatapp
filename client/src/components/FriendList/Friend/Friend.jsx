import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

import classes from "./Friend.module.scss";

const Friend = ({ friend }) => {
  const history = useHistory();

  const handleRedirectToUser = (userId) => {
    history.push(`/user-info/${userId}`);
  };

  return (
    <div className={classes.friend}>
      <div
        className={classes.friend_avatar}
        onClick={(e) => handleRedirectToUser(friend.id)}
      >
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
