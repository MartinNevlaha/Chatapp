import React from "react";
import { useTranslation } from "react-i18next";
import Flags from "country-flag-icons/react/1x1";

import classes from "./BackDropMenu.module.scss";

const BackDropMenu = ({ openMenu, handleClose }) => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <div
        className={
          openMenu
            ? [classes.backdrop_div, classes.backdrop_open].join(" ")
            : classes.backdrop_div
        }
        onClick={handleClose}
      ></div>
      <div
        className={
          Boolean(openMenu)
            ? [classes.backDropMenu, classes.open].join(" ")
            : classes.backDropMenu
        }
      >
        <ul className={classes.backDropMenu_items}>
          <li className={classes.backDropMenu_item}>Profile</li>
          <li className={classes.backDropMenu_item}>My Account</li>
          <li className={classes.backDropMenu_item}>Logout</li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default BackDropMenu;
