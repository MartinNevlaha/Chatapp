import React, { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faTachometerAlt,
  faUser,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

import classes from "./SideDrawer.module.scss";
import NavItem from "../NavItem/NavItem";

const SideDrawer = (props) => {
  const { t } = useTranslation();
  const sideRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClose);

    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [sideRef]);

  const handleClose = (event) => {
    if (sideRef.current && !sideRef.current.contains(event.target)) {
      props.closeSideDrawer();
    }
  };
  return (
    <aside
      className={
        props.isOpen
          ? [classes.sideDrawer, classes.open].join(" ")
          : classes.sideDrawer
      }
    >
      <div ref={sideRef} className={classes.sideDrawer_content}>
        <div className={classes.sideDrawer_content_title}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            size="1x"
            cursor="pointer"
            onClick={props.closeSideDrawer}
            color="rgb(80, 79, 79)"
          />
        </div>
        <ul className={classes.sideDrawer_content_items}>
          <NavItem
            link="/"
            exact
            icon={faTachometerAlt}
            close={() => props.closeSideDrawer()}
          >
            {t("sideDrawer.dashboard")}
          </NavItem>
          <NavItem
            icon={faUser}
            link="/users-list"
            close={() => props.closeSideDrawer()}
          >
            {t("sideDrawer.userList")}
          </NavItem>
          <NavItem
            icon={faCommentDots}
            link="/chat"
            close={() => props.closeSideDrawer()}
          >
            {t("sideDrawer.chat")}
          </NavItem>
        </ul>
      </div>
    </aside>
  );
};

export default SideDrawer;
