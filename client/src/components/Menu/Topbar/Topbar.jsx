import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

import classes from "./Topbar.module.scss";
import BackDropMenu from "./BackDropMenu/BackdropMenu";

const Topbar = (props) => {
  const { t } = useTranslation();

  return (
    <div className={classes.topbar}>
      <div className={classes.topbar_left}>
        <div className={classes.topbar_left_iconWrapper} onClick={props.menuClick}>
          <FontAwesomeIcon icon={faBars} size="2x" color="white" />
        </div>
        <h1 className={classes.topbar_left_appName}>
          {t("topNavbar.appName")}
        </h1>
        <div className={classes.topbar_left_search}>
          <FontAwesomeIcon
            icon={faSearch}
            size="1x"
            className={classes.topbar_left_search_icon}
          />
          <input type="text" placeholder={t("topNavbar.search")} />
        </div>
      </div>
      <div className={classes.topbar_right}>
        <BackDropMenu />
      </div>
    </div>
  );
};

export default Topbar;
