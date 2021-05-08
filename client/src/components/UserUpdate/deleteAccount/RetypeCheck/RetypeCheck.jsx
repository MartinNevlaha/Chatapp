import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import classes from "./RetypeCheck.module.scss";
import Button from "../../../UI/Button/Button";

export const RetypeCheck = ({
  isRetypeShow,
  string,
  inputValue,
  changeInput,
  isInValid,
  openModal,
  isTouch,
  refresh,
}) => {
  RetypeCheck.propTypes = {
    isRetypeShow: PropTypes.bool,
    string: PropTypes.string,
    inputValue: PropTypes.string,
    changeInput: PropTypes.func,
    isInValid: PropTypes.bool,
    openModal: PropTypes.bool,
    isTouch: PropTypes.bool,
    refresh: PropTypes.func,
  };
  return (
    <div
      className={
        isRetypeShow
          ? [classes.retypeCheck, classes.open].join(" ")
          : classes.retypeCheck
      }
    >
      <div className={classes.retypeCheck_content}>
        <h3>
          {t("retypeCheck.retypeNumber")} <span>{string}</span>
        </h3>
        <input
          type="text"
          maxLength="6"
          value={inputValue}
          onChange={(e) => changeInput(e)}
        />
        <FontAwesomeIcon
          icon={faRedo}
          color="#1976d2"
          cursor="pointer"
          onClick={refresh}
        />
      </div>
      <div className={classes.retypeCheck_content_message}>
        {isTouch && isInValid && <p>{t("retypeCheck.errMatchNumber")}</p>}
      </div>
      <Button clicked={openModal} disabled={isInValid}>
        Ok
      </Button>
    </div>
  );
};

export default RetypeCheck;
