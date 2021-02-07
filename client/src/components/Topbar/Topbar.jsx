import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { Menu, MenuItem } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import classes from "./Topbar.module.scss";

const Topbar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const { t } = useTranslation();

  const handleClick = (event) => {
    console.log(event.currentTarget);
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
        <div className={classes.topbar_right_acount} onClick={handleClick}>
          <FontAwesomeIcon
            icon={faUser}
            cursor="pointer"
            className={classes.topbar_right_acount_icon}
          />
        </div>
        <Menu
          id="simple-menu"
          anchorEl={openMenu}
          keepMounted
          open={Boolean(openMenu)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Topbar;
