import React, { useState } from "react";

import classes from "./deleteAccount.module.scss";
import Button from "../UI/Button/Button";
import RetypeCheck from "./RetypeCheck/RetypeCheck";
import { generateRandomNumbers } from "../../utils/utilities";

export const DeleteAccount = ({ openModal }) => {
  const [isRetypeShow, setIsRetypeShow] = useState(false);
  const [retypeString, setRetypeString] = useState("");
  const [inputString, setInputString] = useState("");
  const [isInValid, setIsInValid] = useState(true);
  const [isTouch, setIsTouch] = useState(false);

  const handleClickDelete = () => {
    setIsRetypeShow(true);
    setRetypeString(generateRandomNumbers());
  };

  const handleInputString = (e) => {
    setIsTouch(true);
    setInputString(e.target.value);
    if (e.target.value.length >= 6) {
      retypeString === e.target.value
        ? setIsInValid(false)
        : setIsInValid(true);
    } else {
      setIsTouch(false);
      setIsInValid(true)
    }
  };

  const handleAccountDelete = () => {
    console.log("delete");
  };

  const handleRefresh = () => {
    setRetypeString(generateRandomNumbers());
    setIsTouch(false);
    setInputString("");
    setIsInValid(true);
  };

  return (
    <div className={classes.deleteAccount}>
      <h2>Delete your account</h2>
      <div
        className={
          isRetypeShow
            ? [classes.deleteAccount_container, classes.close].join(" ")
            : classes.deleteAccount_container
        }
      >
        <p>You can delete your account here. Just pres delete button</p>
        <Button type="button" danger clicked={handleClickDelete}>
          Delete
        </Button>
      </div>
      <RetypeCheck
        isRetypeShow={isRetypeShow}
        string={retypeString}
        inputValue={inputString}
        changeInput={handleInputString}
        isInValid={isInValid}
        accountDelete={handleAccountDelete}
        isTouch={isTouch}
        refresh={handleRefresh}
      />
    </div>
  );
};

export default DeleteAccount;
