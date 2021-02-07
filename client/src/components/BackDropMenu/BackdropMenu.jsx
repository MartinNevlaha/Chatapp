import React from "react";
import { useTranslation } from "react-i18next";
import Flags from "country-flag-icons/react/1x1";

import classes from "./BackDropMenu.module.scss";

const BackDropMenu = ({ openMenu, handleClose }) => {
  const { t } = useTranslation();

  return (
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
  );
};

export default BackDropMenu;
