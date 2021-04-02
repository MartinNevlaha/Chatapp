import React from "react";
import { faUser, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classes from "./User.module.scss";

const User = ({user}) => {
  return (
    <div key={user.id} className={classes.user}>
      <div className={classes.user_avatar}>
        {user.avatar ? (
          <img src={user.avatar} alt="avatar" />
        ) : (
          <div className={classes.user_avatar_icon}>
            <FontAwesomeIcon icon={faUser} />
          </div>
        )}
      </div>
      <div className={classes.user_name}>
        <h2>{user.fullName}</h2>
      </div>
      <div className={classes.user_isFriend}>
        {user.friendStatus && user.friendStatus === 1 && (
          <FontAwesomeIcon icon={faCheck} color="green" />
        )}
      </div>
    </div>
  );
};

export default User;
