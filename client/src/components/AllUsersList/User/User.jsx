import React from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import classes from "./User.module.scss";
import { parseDateTime } from "../../../utils/utilities";

const User = ({ user, requestStatusElement }) => {
  const history = useHistory();

  const handleRedirectToUserInfo = (userId) => {
  history.push(`/user-info/${userId}`);
  };

  User.propTypes = {
    user: PropTypes.object,
    requestStatusElement: PropTypes.element
  }

  return (
    <div
      className={classes.user}
      onClick={(e) => handleRedirectToUserInfo(user.id)}
    >
      <div className={classes.user_avatar}>
        {user.avatar ? (
          <img src={user.avatar} alt="avatar" />
        ) : (
          <div className={classes.user_avatar_icon}>
            <FontAwesomeIcon icon={faUser} size="3x" />
          </div>
          
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
