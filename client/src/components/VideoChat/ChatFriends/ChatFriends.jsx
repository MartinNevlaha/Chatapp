import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import classes from "./ChatFriends.module.scss";
import ChatFriend from "./ChatFriend/ChatFriend";
import Spinner from "../../UI/Spinner/Spinner";
import Filter from "./Filter/Filter";
import { searchFriendsHelper } from "../../../utils/utilities";

const ChatFriends = ({
  friends,
  loading,
  chatData,
  onAddToChat,
  show,
  onShowFriends,
  onCallToInit
}) => {
  const [filterBy, setFilterBy] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const friendsRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClose);

    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [friendsRef]);

  const handleClose = (event) => {
    if (friendsRef.current && !friendsRef.current.contains(event.target)) {
      onShowFriends(false);
    }
  };

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
    onAddToChat: PropTypes.func,
    show: PropTypes.bool,
    onShowFriends: PropTypes.func,
    onCallToInit: PropTypes.func
  };

  return (
    <div
      ref={friendsRef}
      className={
        show
          ? [classes.chatFriends, classes.open].join(" ")
          : classes.chatFriends
      }
    >
      <div className={classes.chatFriends_header}>
        <div className={classes.chatFriends_header_title}>
          <div
            className={classes.chatFriends_header_title_close}
            onClick={() => onShowFriends(false)}
          >
            <FontAwesomeIcon icon={faChevronLeft} color="white" />
          </div>
          <h2>Friends</h2>
        </div>
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
              onAddToChat={onAddToChat}
              onCallToInit={onCallToInit}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ChatFriends;
