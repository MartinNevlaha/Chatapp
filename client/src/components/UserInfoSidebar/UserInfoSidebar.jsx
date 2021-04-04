import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCheck,
  faTimesCircle,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

import classes from "./UserInfoSidebar.module.scss";
import Card from "../UI/Card/Card";
import { parseDateTime } from "../../utils/utilities";
import Button from "../UI/Button/Button";
import { friendStatus } from "../../config/friendStatus";

export const UserInfoSidebar = ({
  userProfile,
  showMyself,
  isFriend,
  addFriend,
}) => {
  let friendStatusContent = <Button clicked={addFriend}>Add friend</Button>;
  if (isFriend === friendStatus.accept) {
    friendStatusContent = (
      <React.Fragment>
        <p>Request accepted</p>
        <FontAwesomeIcon icon={faCheck} color="green" />{" "}
      </React.Fragment>
    );
  } else if (isFriend === friendStatus.pending) {
    friendStatusContent = (
      <React.Fragment>
        <p>Request pending</p>
        <FontAwesomeIcon icon={faQuestionCircle} />
      </React.Fragment>
    );
  } else if (isFriend === friendStatus.reject) {
    friendStatusContent = (
      <React.Fragment>
        <p>Request rejected</p>
        <FontAwesomeIcon icon={faTimesCircle} />
      </React.Fragment>
    );
  }

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
            {friendStatusContent}
          </div>
        )}
      </div>
    </Card>
  );
};

export default UserInfoSidebar;
