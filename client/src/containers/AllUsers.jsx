import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as action from "../store/actions";
import { numberOfPages } from "../utils/utilities";
import AllUsersList from "../components/AllUsersList/AllUsersList";

const AllUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const numberOfUsers = useSelector((state) => state.users.count);
  const loading = useSelector((state) => state.users.loading);
  const [currentPage, setCurrentPage] = useState(0);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    dispatch(action.fetchActiveUsers(currentPage, limit));
  }, [dispatch]);

  const handleCurrentPage = (page) => {
    setCurrentPage(page);
    dispatch(action.fetchActiveUsers(page, limit));
  };

  const handleSetLimit = (e) => {
    setCurrentPage(0);
    setLimit(e.target.value);
    dispatch(action.fetchActiveUsers(0, e.target.value));
  };

  const handleAddFriend = (e, userId) => {
    e.stopPropagation();
    const data = {
      friendId: userId,
    };
    dispatch(action.addFriend(data));
  };

  const handleArrayOfPages = (numberOfUsers, limit) => {
    const pagesNumber = numberOfPages(numberOfUsers, limit);
    return Array.from({ length: pagesNumber }, (_, index) => index);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-around",
        flexWrap: "wrap",
      }}
    >
      <AllUsersList
        users={users}
        loading={loading}
        handleCurrentPage={handleCurrentPage}
        arrayOfPages={handleArrayOfPages(numberOfUsers, limit)}
        handleSetLimit={handleSetLimit}
        limit={+limit}
        addFriend={handleAddFriend}
      />
    </div>
  );
};

export default AllUsers;
