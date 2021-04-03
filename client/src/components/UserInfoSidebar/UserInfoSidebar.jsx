import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCheck } from "@fortawesome/free-solid-svg-icons";

import classes from "./UserInfoSidebar.module.scss";
import Card from "../UI/Card/Card";
import { parseDateTime } from "../../utils/utilities";
import Button from "../UI/Button/Button";

export const UserInfoSidebar = ({ userProfile, showMyself, isFriend, addFriend }) => {
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
          <Link to="/update-profile">
            <h2>{userProfile.fullName}</h2>
          </Link>
          <hr />
          <p>Registered since: {parseDateTime(userProfile.createdAt)}</p>
          <p>Number of friends: {userProfile.friendsCount}</p>
        </div>
        {!showMyself && (
          <div className={classes.userInfo_friendship}>
            {isFriend ? (
              <div className={classes.userInfo_friendship_container}>
                <p>Allready friends</p>
                <FontAwesomeIcon icon={faCheck} color="green" />{" "}
              </div>
            ) : (
              <Button clicked={addFriend}>Add friend</Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default UserInfoSidebar;
