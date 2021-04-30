import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneSlash, faPhone } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import classes from "./VideoCallToast.module.scss";

const VideoCallToast = ({ isShow, user, onRejectedCall }) => {

  return (
    <div
      className={
        isShow
          ? [classes.callToast, classes.showed].join(" ")
          : classes.callToast
      }
    >
      <div className={classes.callToast_user}>
        <p>{user.fullName} calling...</p>
      </div>
      <div className={classes.callToast_btn_container}>
        <div className={classes.callToast_accept}>
          <FontAwesomeIcon icon={faPhone} />
        </div>
        <div
          className={classes.callToast_reject}
        >
          <FontAwesomeIcon icon={faPhoneSlash} />
        </div>
      </div>
    </div>
  );
};

export default VideoCallToast;
