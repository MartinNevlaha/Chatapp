import React from "react";

import classes from "./RetypeCheck.module.scss";
import Button from "../../UI/Button/Button";

export const RetypeCheck = ({
  isRetypeShow,
  string,
  inputValue,
  changeInput,
  isInValid,
  accountDelete,
  isTouch
}) => {
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
          Please retype this number <span>{string}</span>
        </h3>
        <input
          type="text"
          maxLength="6"
          value={inputValue}
          onChange={(e) => changeInput(e)}
        />
      </div>
      <div className={classes.retypeCheck_content_message}>
        {isTouch && isInValid && <p>Entered number do not match!</p>}
      </div>
      <Button clicked={accountDelete} disabled={isInValid}>Ok</Button>
    </div>
  );
};

export default RetypeCheck;
