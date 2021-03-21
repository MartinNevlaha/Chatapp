import React from "react";

import classes from "./AllUsersList.module.scss";
import { parseDateTime } from "../../utils/utilities";
import Button from "../UI/Button/Button";
import Spinner from "../UI/Spinner/Spinner";

const AllUsersList = ({ users, loading, pages, currentPage}) => {
  let arrayOfPages = Array.from(Array(+pages).keys());

  let content = users.map((user) => {
    return (
      <div key={user.id} className={classes.users_container_user}>
        <div className={classes.users_container_user_avatar}>
          <img src={user.avatar} alt="avatar" />
        </div>
        <div className={classes.users_container_user_info}>
          <h3>{user.fullName}</h3>
          <p>Registered since: {parseDateTime(user.createdAt)}</p>
        </div>
        <div className={classes.users_container_user_btn}>
          <Button type="button">Add friend </Button>
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
          <h1>Pages: </h1>
          {arrayOfPages.map((page) => (
            <p onClick={() => currentPage(page)} key={page}>
              {page + 1}
            </p>
          ))}
        </div>
        <div className={classes.users_footer_limit}>
          <p>Limit per page: </p>
          <select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AllUsersList;
