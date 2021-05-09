import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import classes from "./Filter.module.scss";
import SearchInput from "../../../Inputs/SearchInputs/SearchInputs";

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
      <SearchInput
        currentValue={searchValue}
        onChangeInput={onSearch}
        styleType="small"
      />
      <div className={classes.filter_btns}>
        <p>{t("friendsFilter.title")}</p>
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
