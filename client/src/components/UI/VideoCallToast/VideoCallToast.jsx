import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneSlash, faPhone } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import LazyImage from "../../UI/LazyImage/LazyImage";
import classes from "./VideoCallToast.module.scss";

const VideoCallToast = ({ isShow, user, onRejectCall, isMeCalling }) => {
  VideoCallToast.propTypes = {
    isShow: PropTypes.bool,
    user: PropTypes.object,
    onRejectCall: PropTypes.func,
    isMeCalling: PropTypes.bool,
  };
  return (
    <div
      className={
        isShow
          ? [classes.callToast, classes.showed].join(" ")
          : classes.callToast
      }
    >
      <div className={classes.callToast_user}>
        <div className={classes.callToast_user_avatar}>
          <LazyImage image={{ src: user.avatar, alt: "avatar" }} />
        </div>
        {isMeCalling ? (
          <p>Call to {user.fullName}</p>
        ) : (
          <p>{user.fullName} is calling...</p>
        )}
      </div>
      <div className={classes.callToast_btn_container}>
        {!isMeCalling &&
        <div className={classes.callToast_accept}>
          <FontAwesomeIcon icon={faPhone} />
        </div> }
        <div
          className={classes.callToast_reject}
          onClick={() => onRejectCall()}
        >
          <FontAwesomeIcon icon={faPhoneSlash} />
        </div>
      </div>
    </div>
  );
};

export default VideoCallToast;
