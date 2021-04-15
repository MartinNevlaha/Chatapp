import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

import classes from "./Filter.module.scss";

const Filter = () => {
  const { t } = useTranslation();
  return (
    <div className={classes.filter}>
      <div className={classes.filter_search}>
        <FontAwesomeIcon
          icon={faSearch}
          size="1x"
          className={classes.filter_search_icon}
        />
        <input type="text" placeholder={t("topNavbar.search")} />
      </div>
      <div className={classes.filter_btns}>
        <p>Show friends</p>
        <button>All</button>
        <button>Online</button>
        <button>Offline</button>
      </div>
      <div className={classes.filter_input}></div>
    </div>
  );
};

export default Filter;
