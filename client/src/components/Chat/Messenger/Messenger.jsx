import React from "react";

import classes from "./Messenger.module.scss";
import SearchInput from "../../Inputs/SearchInputs/SearchInputs";

const Messenger = () => {
  return (
    <div className={classes.messenger}>
      <div className={classes.messenger_header}>
        <h2>Messenger</h2>
        <div className={classes.messenger_header_input}>
          <SearchInput styleType="large" />
        </div>
      </div>
      <div className={classes.messenger_chats}></div>
    </div>
  );
};

export default Messenger;
