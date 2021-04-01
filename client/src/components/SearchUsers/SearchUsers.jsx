import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import * as action from "../../store/actions";
import classes from "./SearchUsers.module.scss";

export const SearchUsers = () => {
  const [searchString, setSearchString] = useState("");
  const findedUsers = useSelector(state => state.users.findedUsers);
  const count = useSelector(state => state.users.findedCount);
  const LIMIT = 5;
  const dispatch = useDispatch();

  const handleOnChangeInput = (e) => {
    setSearchString(e.target.value);
    dispatch(action.searchUsers(e.target.value, LIMIT, 0))
  };

  const { t } = useTranslation();
  return (
    <div className={classes.search}>
      <FontAwesomeIcon
        icon={faSearch}
        size="1x"
        className={classes.search_icon}
      />
      <input
        type="text"
        placeholder={t("topNavbar.search")}
        value={searchString}
        onChange={handleOnChangeInput}
      />
    </div>
  );
};

export default SearchUsers;
