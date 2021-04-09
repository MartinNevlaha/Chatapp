import React from "react";

import classes from "./FriendList.module.scss";
import Card from "../UI/Card/Card";

const Friend = ({loading, userFriends}) => {
  return <Card>
      <div className={classes.friendList}>
      <h2>List of friends</h2>
      <hr/>
  </div>
  </Card>
};

export default Friend;
