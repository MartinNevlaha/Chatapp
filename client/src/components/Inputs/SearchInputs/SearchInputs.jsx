import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import classes from "./SearchInput.module.scss";

const SearchInputs = ({ currentValue, onChangeInput, styleType, children }) => {
  const { t } = useTranslation();

  SearchInputs.propTypes = {
    currentValue: PropTypes.string,
    onChangeInput: PropTypes.func,
    styleType: PropTypes.oneOf(["small", "medium", "large"]),
    children: PropTypes.element
  };

  return (
    <div className={classes[styleType]}>
      <FontAwesomeIcon
        icon={faSearch}
        size="1x"
        className={classes.icon}
      />
      <input
        type="text"
        placeholder={t("topNavbar.search")}
        value={currentValue}
        onChange={onChangeInput}
      />
      {children}
    </div>
  );
};

export default SearchInputs;
