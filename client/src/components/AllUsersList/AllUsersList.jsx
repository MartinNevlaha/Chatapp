import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

import classes from "./AllUsersList.module.scss";
import Button from "../UI/Button/Button";
import Spinner from "../UI/Spinner/Spinner";
import User from "./User/User";
import { friendStatus } from "../../config/friendStatus";

const AllUsersList = ({
  users,
  loading,
  pages,
  handleCurrentPage,
  handleSetLimit,
  limit,
  addFriend,
}) => {
  let arrayOfPages = Array.from(Array(+pages).keys());

  console.log(pages);

  let content = users.map((user) => {
    let requestStatusElement = (
      <Button type="button" clicked={(e) => addFriend(e, user.id)}>
        Add friend
      </Button>
    );
    if (user.friendStatus === friendStatus.pending) {
      requestStatusElement = (
        <FontAwesomeIcon icon={faQuestionCircle} size="2x" />
      );
    } else if (user.friendStatus === friendStatus.accept) {
      requestStatusElement = (
        <FontAwesomeIcon icon={faCheckCircle} size="2x" color="green" />
      );
    } else if (user.friendStatus) {
      requestStatusElement = (
        <FontAwesomeIcon icon={faTimesCircle} size="2x" color="red" />
      );
    } else if (user.loadingAddFriend) {
      requestStatusElement = <Spinner />;
    }
    return (
      <User
        key={user.id}
        user={user}
        requestStatusElement={requestStatusElement}
      />
    );
  });
  if (loading) {
    content = <Spinner />;
  }
  return (
    <div className={classes.users}>
      <div className={classes.users_header}>
        <h2>List of Users</h2>
      </div>
      <div className={classes.users_container}>{content}</div>
      <div className={classes.users_footer}>
        <div className={classes.users_footer_pages}>
          <h4>Actual page</h4>
          <select
            className={classes.users_footer_pages_select}
            onChange={(e) => {
              handleCurrentPage(e.target.value - 1);
            }}
          >
            {arrayOfPages.map((opt) => (
              <option key={opt}>{opt + 1}</option>
            ))}
          </select>
          <h4>of total pages {arrayOfPages.length}</h4>
        </div>
        <div className={classes.users_footer_limit}>
          <h4>Limit per page: </h4>
          <select onChange={(e) => handleSetLimit(e)} value={limit}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AllUsersList;
