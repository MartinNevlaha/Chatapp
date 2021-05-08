import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCheck,
  faTimesCircle,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import classes from "./UserInfoSidebar.module.scss";
import Card from "../UI/Card/Card";
import { parseDateTime } from "../../utils/utilities";
import Button from "../UI/Button/Button";
import { friendStatus } from "../../constants/friendStatus";

export const UserInfoSidebar = ({
  userProfile,
  showMyself,
  isFriend,
  addFriend,
}) => {
  const { t } = useTranslation();
  let friendStatusContent = <Button clicked={addFriend}>{t("userSidebar.addFriend")}</Button>;

  if (isFriend === friendStatus.accept) {
    friendStatusContent = (
      <React.Fragment>
        <p>{t("userSidebar.requestAccepted")}</p>
        <FontAwesomeIcon icon={faCheck} color="green" />{" "}
      </React.Fragment>
    );
  } else if (isFriend === friendStatus.pending) {
    friendStatusContent = (
      <React.Fragment>
        <p>{t("userSidebar.requestPending")}</p>
        <FontAwesomeIcon icon={faQuestionCircle} />
      </React.Fragment>
    );
  } else if (isFriend === friendStatus.reject) {
    friendStatusContent = (
      <React.Fragment>
        <p>{t("userSidebar.requestRejected")}</p>
        <FontAwesomeIcon icon={faTimesCircle} color="red" />
      </React.Fragment>
    );
  } else if (isFriend === friendStatus.myself) {
    friendStatusContent = null;
  }

  UserInfoSidebar.propTypes = {
    userProfile: PropTypes.object,
    showMyself: PropTypes.bool,
    isFriend: PropTypes.oneOf([0, 1, 2, 3, 4]),
    addFriend: PropTypes.func,
  };

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
          <Link to={`/user-info/${userProfile.id}`}>
            <h2>{userProfile.fullName}</h2>
          </Link>
          <hr />
          <p>{t("userSidebar.registeredSince")} {parseDateTime(userProfile.createdAt)}</p>
          <p>{t("userSidebar.friendsNumber")} {userProfile.friendsCount}</p>
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
