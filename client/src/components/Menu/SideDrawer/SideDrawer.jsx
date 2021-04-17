import React, { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faTachometerAlt,
  faList,
  faClock,
  faCalendar,
  faUserCheck,
  faUser,
  faCommentDots
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
          <NavItem link="/" exact icon={faTachometerAlt}>
            {t("sideDrawer.dashboard")}
          </NavItem>
          <NavItem icon={faUser} link="/users-list">{t("sideDrawer.userList")}</NavItem>
          <NavItem icon={faCommentDots} link="/chat">{t("sideDrawer.chat")}</NavItem>
          <NavItem icon={faList} link="/job-offers">{t("sideDrawer.showJobOffer")}</NavItem>
          <NavItem icon={faClock} link="/schedule-interview">
            {t("sideDrawer.schedule")}
          </NavItem>
          <NavItem icon={faCalendar} link="/callendar">{t("sideDrawer.calendar")}</NavItem>
          <NavItem icon={faUserCheck} link="/candidates-evaluation">
            {t("sideDrawer.evaluation")}
          </NavItem>
        </ul>
      </div>
    </aside>
  );
};

export default SideDrawer;
