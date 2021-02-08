import React, {useState, useRef, useEffect} from "react";
import { useTranslation } from "react-i18next";
import Flags from "country-flag-icons/react/1x1";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import classes from "./BackDropMenu.module.scss";

const BackDropMenu = (props) => {
  const [openMenu, setOpenMenu] = useState(null);
  const { t } = useTranslation();
  const menuRef = useRef(null);

  useEffect(()=>{
    document.addEventListener("mousedown", handleClose);
    //clean up
    return () => {
      document.removeEventListener("mousedown", handleClose);
    }
  }, [menuRef])

  const handleClose = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenMenu(null);
    }
  }

  const handleClick = (event) => {
    setOpenMenu(event.currentTarget);
  };

  return (
    <React.Fragment>
    <div className={classes.account_icon_wrapper} onClick={handleClick}>
    <FontAwesomeIcon
      icon={faUser}
      cursor="pointer"
      className={classes.account_icon_wrapper_icon}
    />
      </div>
      <div
        ref={menuRef}
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
