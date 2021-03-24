import React from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import classes from "./UserInfoSidebar.module.scss";
import Card from "../UI/Card/Card";
import { parseDateTime } from "../../utils/utilities";

export const UserInfoSidebar = () => {
  const userProfile = useSelector((state) => state.userProfile.user);
  return (
    <Card type="small_card">
      <div className={classes.userInfo}>
        <div className={classes.userInfo_header}></div>
        <div className={classes.userInfo_avatar}>
          {userProfile.avatar ? (
            <img src={userProfile.avatar} alt="avatar" />
          ) : (
            <div className={classes.userInfo_avatar_icon}>
              <FontAwesomeIcon icon={faUser} size="3x" />
            </div>
          )}
        </div>
        <div className={classes.userInfo_content}>
          <h2>{userProfile.fullName}</h2>
          <p>Registered since: {parseDateTime(userProfile.createdAt)}</p>
          <p>Number of friends: 32</p>
        </div>
      </div>
    </Card>
  );
};

export default UserInfoSidebar;
