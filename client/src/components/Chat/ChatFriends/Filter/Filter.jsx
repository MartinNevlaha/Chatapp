import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import classes from "./Filter.module.scss";

const Filter = ({ filterBy, searchValue, onSearch, activeBtn }) => {
  const { t } = useTranslation();

  const btns = ["all", "online", "offline"];

  Filter.propTypes = {
    filterBy: PropTypes.func,
    searchValue: PropTypes.string,
    onSearch: PropTypes.func,
    activeBtn: PropTypes.oneOf(["all", "online", "offline"]),
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
        {btns.map((btn) => (
          <button
            key={btn}
            onClick={() => filterBy(btn)}
            className={
              btn === activeBtn
                ? [classes.active, classes.filter_btns_btn].join(" ")
                : classes.filter_btns_btn
            }
          >
            {btn}
          </button>
        ))}
      </div>
      <div className={classes.filter_input}></div>
    </div>
  );
};

export default Filter;
