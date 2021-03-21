import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as action from "../store/actions";
import AllUsersList from "../components/AllUsersList/AllUsersList";

const AllUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const numberOfUsers = useSelector((state) => state.users.count);
  const loading = useSelector((state) => state.users.loading);
  const [currentPage, setCurrentPage] = useState(0);
  const [limit, setLimit] = useState(2);

  const numberOfPages = (totalRecords, limit) => {
    return Math.round(totalRecords / limit);
  };

  useEffect(() => {
    dispatch(action.fetchActiveUsers(currentPage, limit));
  }, [dispatch]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
    dispatch(action.fetchActiveUsers(page, limit));
  }

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
        pages={numberOfPages(numberOfUsers, limit)}
        currentPage={handlePageClick}
      />
    </div>
  );
};

export default AllUsers;
