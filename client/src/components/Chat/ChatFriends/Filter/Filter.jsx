import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import classes from "./Filter.module.scss";

const Filter = ({ filterBy, searchValue, onSearch }) => {
  const { t } = useTranslation();

  Filter.propTypes = {
    filterBy: PropTypes.func,
    searchValue: PropTypes.string,
    onSearch: PropTypes.func,
  };

  return (
    <div className={classes.filter}>
      <div className={classes.filter_search}>
        <FontAwesomeIcon
          icon={faSearch}
          size="1x"
          className={classes.filter_search_icon}
        />
        <input
          type="text"
          placeholder={t("topNavbar.search")}
          value={searchValue}
          onChange={onSearch}
        />
      </div>
      <div className={classes.filter_btns}>
        <p>Show friends</p>
        <button
          onClick={() => {
            filterBy("all");
          }}
        >
          All
        </button>
        <button
          onClick={() => {
            filterBy("online");
          }}
        >
          Online
        </button>
        <button
          onClick={() => {
            filterBy("offline");
          }}
        >
          Offline
        </button>
      </div>
      <div className={classes.filter_input}></div>
    </div>
  );
};

export default Filter;
