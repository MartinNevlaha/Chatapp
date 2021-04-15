import React from "react";
import PropTypes from "prop-types";

import classes from "./ChatFriends.module.scss";
import ChatFriend from "./ChatFriend/ChatFriend";
import Spinner from "../../UI/Spinner/Spinner";
import Filter from "./Filter/Filter";

const ChatFriends = ({ friends, loading }) => {
  ChatFriends.propTypes = {
    friends: PropTypes.array,
    loading: PropTypes.bool,
  };

  return (
    <div className={classes.chatFriends}>
      <div className={classes.chatFriends_header}>
        <h2>Friends</h2>
        <Filter />
      </div>
      {loading ? (
        <Spinner />
      ) : (
        friends.map((friend) => <ChatFriend friend={friend} />)
      )}
    </div>
  );
};

export default ChatFriends;
