import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneSlash, faPhone } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import classes from "./CallControls.module.scss";

const CallControls = ({ isMeCalling, isReceivingCall }) => {

  CallControls.propTypes = {
    isMeCalling: PropTypes.bool,
    isReceivingCall: PropTypes.bool
  }

  return (
    <div className={classes.callControls}>
      {console.log(isMeCalling, isReceivingCall)}
      {isMeCalling && (
        <div className={classes.callControls_accept}>
          <FontAwesomeIcon icon={faPhone} />
        </div>
      )}
      <div className={classes.callControls_reject}>
        <FontAwesomeIcon icon={faPhoneSlash} />
      </div>
    </div>
  );
};

export default CallControls;
