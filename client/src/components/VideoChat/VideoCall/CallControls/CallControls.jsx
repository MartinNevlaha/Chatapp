import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneSlash, faPhone } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import classes from "./CallControls.module.scss";

const CallControls = ({ isMeCalling, onAcceptCall }) => {
  CallControls.propTypes = {
    isMeCalling: PropTypes.bool,
    onAcceptCall: PropTypes.func,
  };

  return (
    <div className={classes.callControls}>
      {isMeCalling && (
        <div
          className={classes.callControls_accept}
          onClick={() => onAcceptCall()}
        >
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
