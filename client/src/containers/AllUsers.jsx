import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as action from "../store/actions";
import AllUsersList from "../components/AllUsersList/AllUsersList";

const AllUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.users.loading);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(3);

  const indexOfLastPost = currentPage * limit;
  const indexOfFirstPost = indexOfLastPost - limit;
  const currentPost = users.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    dispatch(action.fetchActiveUsers(currentPage, limit));
  }, [dispatch]);

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
      <AllUsersList users={users} loading={loading} />
    </div>
  );
};

export default AllUsers;
