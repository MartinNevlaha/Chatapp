import React from "react";

import classes from "./FriendList.module.scss";
import Card from "../UI/Card/Card";
import Spinner from "../UI/Spinner/Spinner";
import Friend from "./Friend/Friend";
import { friendStatus } from "../../constants/friendStatus";

const FriendList = ({ loading, userFriends, isFriend }) => {
  let content = <Spinner />;
  if (!loading) {
    content = userFriends.map((friend, i) => (
      <Friend friend={friend} key={i} />
    ));
  }
  return (
    <Card type="small_card">
      <div className={classes.friendList}>
        <h2>List of friends</h2>
        <p>Number of friends {userFriends ? userFriends.length : 0}</p>
        <hr />
        <div className={classes.friendList_container}>
          {isFriend === friendStatus.accept ||
          isFriend === friendStatus.myself ? (
            content
          ) : (
            <React.Fragment>
              <div className={classes.friendList_container_blur}></div>
              <div className={classes.friendList_container_blur_text}>
                <p>You have to be friends to see this</p>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </Card>
  );
};

export default FriendList;
