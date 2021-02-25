import React, { useState } from "react";
import { useSelector } from "react-redux";

import classes from "./Layout.module.scss";
import Topbar from "../components/Menu/Topbar/Topbar";
import SideDrawer from "../components/Menu/SideDrawer/SideDrawer";

const Layout = (props) => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const isAuth = useSelector((state) => state.userAuth.isLogged);

  const handleOpenSideDrawer = () => {
    setSideDrawerOpen(true);
  };

  const closeSideDrawer = () => {
    setSideDrawerOpen(false);
  };

  return (
    <React.Fragment>
      {isAuth && (
        <header>
          <Topbar menuClick={handleOpenSideDrawer} />
        </header>
      )}
      <main className={classes.main_wrapper}>
          <SideDrawer
            isOpen={sideDrawerOpen}
            closeSideDrawer={closeSideDrawer}
          />
          <div className={classes.main_wrapper_content}>{props.children}</div>
      </main>
    </React.Fragment>
  );
};

export default Layout;
