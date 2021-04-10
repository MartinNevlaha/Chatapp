import React from "react";
import { faUser, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import { friendStatus } from "../../config/friendStatus";
import classes from "./User.module.scss";

const User = ({ user, close }) => {
  const history = useHistory();

  User.propTypes = {
    user: PropTypes.object,
    close: PropTypes.func
  }
  
  return (
    <div
      key={user.id}
      className={classes.user}
      onClick={() => {
        history.push(`/user-info/${user.id}`);
        close();
      }}
    >
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
        {user.friendStatus && user.friendStatus === friendStatus.accept ? (
          <FontAwesomeIcon icon={faCheck} color="green" />
        ) : null}
      </div>
    </div>
  );
};

export default User;
