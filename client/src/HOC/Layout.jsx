import React, {useState} from 'react'

import classes from "./Layout.module.scss";
import Topbar from "../components/Menu/Topbar/Topbar";
import SideDrawer from "../components/Menu/SideDrawer/SideDrawer";

const Layout = (props) => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const handleOpenSideDrawer = () => {
    setSideDrawerOpen(true);
  }

  const closeSideDrawer = () => {
    setSideDrawerOpen(false)
  }

  return (
    <React.Fragment>
      <header>
        <Topbar menuClick={handleOpenSideDrawer}/>
      </header>
      <main>  
        <div className={classes.main_wrapper}>
          <SideDrawer isOpen={sideDrawerOpen} closeSideDrawer={closeSideDrawer}/>
          {props.children}
        </div>
      </main>
    </React.Fragment>
  )
}

export default Layout
