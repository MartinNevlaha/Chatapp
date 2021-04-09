import React from "react";

import classes from "./FriendList.module.scss";
import Card from "../UI/Card/Card";
import Spinner from "../UI/Spinner/Spinner";
import Friend from "./Friend/Friend";

const FriendList = ({ loading, userFriends }) => {
  return (
    <Card type="small_card">
      <div className={classes.friendList}>
        <h2>List of friends</h2>
        <p>Number of friends {userFriends ? userFriends.length : 0}</p>
        <hr />
        <div className={classes.friendList_container}>
          {loading ? (
            <Spinner />
          ) : (
            userFriends.map((friend) => (
              <Friend friend={friend} key={friend.id} />
            ))
          )}
        </div>
      </div>
    </Card>
  );
};

export default FriendList;
