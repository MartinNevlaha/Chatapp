import React from 'react'

import classes from "./Filter.module.scss";

const Filter = () => {
  return (
    <div className={classes.filter}>
    <p>Show friends</p>
    <div className={classes.filter_btns}>
      <button>All</button>
      <button>Online</button>
      <button>Offline</button>
    </div>
    <div className={classes.filter_input}>
      
    </div>
  </div>
  )
}

export default Filter
