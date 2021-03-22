import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCheckCircle, faTimesCircle, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

import classes from "./AllUsersList.module.scss";
import { parseDateTime } from "../../utils/utilities";
import Button from "../UI/Button/Button";
import Spinner from "../UI/Spinner/Spinner";

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

  let content = users.map((user) => {
    let requestStatusElement = <Button type="button" clicked={()=>addFriend(user.id)}>Add friend</Button>;
    if (user.friendStatus === 0) {
      requestStatusElement = <FontAwesomeIcon icon={faQuestionCircle} size="2x" />;
    } else if (user.friendStatus === 1) {
      requestStatusElement = <FontAwesomeIcon icon={faCheckCircle} size="2x" color="green" />;
    } else if (user.friendStatus) {
      requestStatusElement = <FontAwesomeIcon icon={faTimesCircle} size="2x" color="red" />;
    } else if (user.loadingAddFriend) {
      requestStatusElement = <Spinner />
    }
    return (
      <div key={user.id} className={classes.users_container_user}>
        <div className={classes.users_container_user_avatar}>
          {user.avatar ? (
            <img src={user.avatar} alt="avatar" />
          ) : (
            <FontAwesomeIcon icon={faUser} size="4x"/>
          )}
        </div>
        <div className={classes.users_container_user_info}>
          <h3>{user.fullName}</h3>
          <p>Registered since: {parseDateTime(user.createdAt)}</p>
        </div>
        <div className={classes.users_container_user_btn}>
          {requestStatusElement}
        </div>
      </div>
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
