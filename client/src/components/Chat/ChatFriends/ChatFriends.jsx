import React, { useState } from "react";
import PropTypes from "prop-types";

import classes from "./ChatFriends.module.scss";
import ChatFriend from "./ChatFriend/ChatFriend";
import Spinner from "../../UI/Spinner/Spinner";
import Filter from "./Filter/Filter";
import { searchFriendsHelper } from "../../../utils/utilities";

const ChatFriends = ({ friends, loading, chatData }) => {
  const [filterBy, setFilterBy] = useState("all");
  const [searchValue, setSearchValue] = useState("");

  const handleSetFilter = (value) => {
    setFilterBy(value);
  };

  const isAllreadyInChat = (friendId, chatData) => {
    let isInChat = false;
    chatData.forEach((chat) => {
      if (chat.Users[0].id === friendId) {
        isInChat = true;
      }
    });
    return isInChat;
  };

  ChatFriends.propTypes = {
    friends: PropTypes.array,
    loading: PropTypes.bool,
    chatData: PropTypes.array,
  };

  return (
    <div className={classes.chatFriends}>
      <div className={classes.chatFriends_header}>
        <h2>Friends</h2>
        <Filter
          filterBy={handleSetFilter}
          searchValue={searchValue}
          onSearch={(e) => setSearchValue(e.target.value)}
          activeBtn={filterBy}
        />
      </div>
      <div className={classes.chatFriends_container}>
        {loading ? (
          <Spinner />
        ) : (
          searchFriendsHelper(friends, filterBy, searchValue).map((friend) => (
            <ChatFriend
              friend={friend}
              key={friend.id}
              chatData={chatData}
              isInChat={isAllreadyInChat(friend.id, chatData)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ChatFriends;
