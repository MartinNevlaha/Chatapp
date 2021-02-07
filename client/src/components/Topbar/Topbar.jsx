import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

import classes from "./Topbar.module.scss";
import BackDropMenu from "../BackDropMenu/BackdropMenu";

const Topbar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const { t } = useTranslation();

  const handleClick = (event) => {
    setOpenMenu(event.currentTarget);
  };
  const handleClose = () => {
    setOpenMenu(null);
  };

  return (
    <div className={classes.topbar}>
      <div className={classes.topbar_left}>
        <div className={classes.topbar_left_iconWrapper}>
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
        <div className={classes.topbar_right_account} onClick={handleClick}>
          <FontAwesomeIcon
            icon={faUser}
            cursor="pointer"
            className={classes.topbar_right_acount_icon}
          />
        </div>
        <BackDropMenu handleClose={handleClose} openMenu={openMenu}/>
      </div>
    </div>
  );
};

export default Topbar;
