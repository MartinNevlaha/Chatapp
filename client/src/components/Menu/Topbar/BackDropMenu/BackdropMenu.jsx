import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import Flags from "country-flag-icons/react/1x1";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUsers,
  faUserCircle,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import * as action from "../../../../store/actions/";

import classes from "./BackDropMenu.module.scss";
import NavItem from "../../NavItem/NavItem";

const BackDropMenu = ({ avatar, requests }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const { t } = useTranslation();
  const menuRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    document.addEventListener("mousedown", handleClose);
    //clean up eventlistener
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [menuRef]);

  const handleClose = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenMenu(false);
    }
  };

  const handleCloseOnLinkClick = () => {
    setOpenMenu(false);
  };

  const handleClick = () => {
    setOpenMenu(true);
  };

  const handleLanguageChange = (language) => {
    i18next.changeLanguage(language, (err) => {
      if (err) return console.log("Something went wrong", err);
    });
    setOpenMenu(null);
  };

  const handleLogout = () => {
    dispatch(action.logout());
  };

  return (
    <React.Fragment>
      <div className={classes.account_icon_wrapper} onClick={handleClick}>
        {requests.length !== 0 && (
          <div className={classes.account_icon_wrapper_requests}>
            <p>{requests.length}</p>
          </div>
        )}
        {avatar ? (
          <img src={avatar} alt="avatar" />
        ) : (
          <FontAwesomeIcon
            icon={faUser}
            cursor="pointer"
            className={classes.account_icon_wrapper_icon}
          />
        )}
      </div>
      <div
        ref={menuRef}
        className={
          openMenu
            ? [classes.backDropMenu, classes.open].join(" ")
            : classes.backDropMenu
        }
      >
        <ul className={classes.backDropMenu_items}>
          <NavItem
            link="/friend-requests"
            close={handleCloseOnLinkClick}
            icon={faUsers}
          >
            <div className={classes.backDropMenu_items_requests}>
              Friend requests
              {requests.length !== 0 && (
                <div className={classes.backDropMenu_items_requests_number}>
                  {requests.length}
                </div>
              )}
            </div>
          </NavItem>
          <NavItem
            icon={faUserCircle}
            link="/update-profile"
            close={handleCloseOnLinkClick}
          >
            {t("topNavbar.profile")}
          </NavItem>
          <h3>{t("topNavbar.languageTitle")}</h3>
          <li onClick={() => handleLanguageChange("en")}>
            <div className={classes.language_wrapper}>
              <Flags.GB
                title="Anglicky"
                className={classes.language_wrapper_flags}
              />
              Anglicky
            </div>
          </li>
          <li onClick={() => handleLanguageChange("sk")}>
            <div className={classes.language_wrapper}>
              <Flags.SK
                title="Slovak"
                className={classes.language_wrapper_flags}
              />
              Slovensky
            </div>
          </li>
          <li onClick={handleLogout}>
            <FontAwesomeIcon
              icon={faSignOutAlt}
              color="rgb(80, 79, 79)"
              className={classes.backDropMenu_logout_icon}
            />
            <p>{t("topNavbar.logout")}</p>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default BackDropMenu;
