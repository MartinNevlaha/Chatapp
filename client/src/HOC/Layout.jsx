import React from 'react'

import Topbar from "../components/Menu/Topbar/Topbar";

const Layout = (props) => {
  return (
    <React.Fragment>
      <header>
        <Topbar />
      </header>
      <main>  
        {props.children}
      </main>
    </React.Fragment>
  )
}

export default Layout
