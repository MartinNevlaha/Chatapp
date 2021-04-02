import React, { useRef, useEffect } from "react";
import { faUser, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classes from "./SearchResults.module.scss";
import User from "../../User/User";

export const SearchResults = ({
  users,
  show,
  close,
  numberOfPages,
  setPage,
  currentPage,
}) => {
  const resultRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", closeHandler);

    return () => {
      document.removeEventListener("mousedown", closeHandler);
    };
  }, [resultRef]);

  const closeHandler = (event) => {
    if (resultRef.current && !resultRef.current.contains(event.target)) {
      close();
    }
  };

  return (
    <div
      ref={resultRef}
      className={
        show
          ? [classes.search_results, classes.open].join(" ")
          : classes.search_results
      }
    >
      {numberOfPages > 1 && (
        <div className={classes.search_results_pagination}>
          {currentPage !== 0 && (
            <p onClick={() => setPage("prev")}>{"<"}Prev page</p>
          )}
          {currentPage !== numberOfPages - 1 && (
            <p onClick={() => setPage("next")}>Next page{">"}</p>
          )}
        </div>
      )}

      <hr />
      {users.length !== 0 ? (
        users.map((user) => <User user={user} key={user.id}/>)
      ) : (
        <p className={classes.search_results_empty}>No users found</p>
      )}
    </div>
  );
};

export default SearchResults;
