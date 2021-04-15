import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import * as action from "../../../../store/actions";
import { numberOfPages } from "../../../../utils/utilities";
import SearchResults from "./SearchResults/SearchResults";
import SearchInput from "../../../Inputs/SearchInputs/SearchInputs";

export const SearchUsers = () => {
  const [searchString, setSearchString] = useState("");
  const findedUsers = useSelector((state) => state.users.findedUsers);
  const count = useSelector((state) => state.users.findedCount);
  const [currentPage, setCurrentPage] = useState(0);
  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const LIMIT = 5;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleOnChangeInput = (e) => {
    setSearchString(e.target.value);
    if (e.target.value.length > 1) {
      dispatch(action.searchUsers(e.target.value, LIMIT, 0));
      setIsResultsOpen(true);
    } else {
      setIsResultsOpen(false);
    }
  };

  const handleCloseResults = () => {
    setIsResultsOpen(false);
    setSearchString("");
  };

  const handleSetPage = (type) => {
    if (type === "next") {
      setCurrentPage(currentPage + 1);
      dispatch(action.searchUsers(searchString, LIMIT, currentPage + 1));
    } else {
      setCurrentPage(currentPage - 1);
      dispatch(action.searchUsers(searchString, LIMIT, currentPage - 1));
    }
  };

  return (
    <SearchInput
      currentValue={searchString}
      onChangeInput={handleOnChangeInput}
      styleType="medium"
    >
      <SearchResults
        users={findedUsers}
        show={isResultsOpen}
        close={handleCloseResults}
        numberOfPages={numberOfPages(count, LIMIT)}
        setPage={handleSetPage}
        currentPage={currentPage}
      />
    </SearchInput>
  );
};

export default SearchUsers;
