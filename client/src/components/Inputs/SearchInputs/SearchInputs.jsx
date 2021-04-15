import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

import classes from "./SearchInput.module.scss";

const SearchInputs = ({ currentValue, onChangeInput }) => {
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
        value={currentValue}
        onChange={onChangeInput}
      />
    </div>
  );
};

export default SearchInputs;
