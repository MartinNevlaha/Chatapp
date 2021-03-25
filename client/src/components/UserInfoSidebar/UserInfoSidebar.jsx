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
        <div className={classes.userInfo_header}>
          <div className={classes.userInfo_header_avatar}>
            {userProfile.avatar ? (
              <div className={classes.userInfo_header_avatar_img}>
                <img src={userProfile.avatar} alt="avatar" />
              </div>
            ) : (
              <div className={classes.userInfo_header_avatar_icon}>
                <FontAwesomeIcon icon={faUser} size="3x" />
              </div>
            )}
          </div>
        </div>
        <div className={classes.userInfo_content}>
          <h2>{userProfile.fullName}</h2>
          <hr />
          <p>Registered since: {parseDateTime(userProfile.createdAt)}</p>
          <p>Number of friends: {userProfile.friendsCount}</p>
        </div>
      </div>
    </Card>
  );
};

export default UserInfoSidebar;
