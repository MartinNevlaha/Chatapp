import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import * as action from "../store/actions/"
import useSocket from "../hooks/socketConnect";
import AllUsers from "../components/AllUsers/AllUsers";

const Dasboard = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.userAuth.user.userId);

  useEffect(() => {
    dispatch(action.fetchUserProfile());
  }, [dispatch])

  useSocket(userId, dispatch);

  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      flexWrap: "wrap"
    }}>
      <AllUsers />
    </div>
  );
};

export default Dasboard;
