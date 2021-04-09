import React from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import classes from "./User.module.scss";
import { parseDateTime } from "../../../utils/utilities";

const User = ({ user, requestStatusElement }) => {
  const history = useHistory();

  const handleRedirectToUserInfo = (userId) => {
  history.push(`/user-info/${userId}`);
  };

  return (
    <div
      className={classes.user}
      onClick={(e) => handleRedirectToUserInfo(user.id)}
    >
      <div className={classes.user_avatar}>
        {user.avatar ? (
          <img src={user.avatar} alt="avatar" />
        ) : (
          <FontAwesomeIcon icon={faUser} size="4x" />
        )}
      </div>
      <div className={classes.user_info}>
        <h3>{user.fullName}</h3>
        <p>Registered since: {parseDateTime(user.createdAt)}</p>
      </div>
      <div className={classes.user_btn}>{requestStatusElement}</div>
    </div>
  );
};

export default User;