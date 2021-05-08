import React, { useEffect, Suspense, lazy } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import i18next from "i18next";

import "./App.scss";
import Layout from "./HOC/Layout";
import Toast from "./components/UI/Toast/Toast";
import ProtectedRoute from "./Router/ProtectedRoute";
import * as action from "./store/actions";
import Spinner from "./components/UI/Spinner/Spinner";

//component lazy load
const Login = lazy(() => import("./containers/Login"));
const Dashboard = lazy(() => import("./containers/Dashboard"));
const UserUpdate = lazy(() => import("./containers/UserUpdate"));
const VideoChat = lazy(() => import("./containers/VideoChat"));
const EmailActivation = lazy(() => import("./containers/EmailActivation"));
const FriendRequest = lazy(() => import("./containers/FriendRequest"));
const AllUsers = lazy(() => import("./containers/AllUsers"));
const UserPageInfo = lazy(() => import("./containers/UserPageInfo"));

function App() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.requestStatus.error);
  const isAuth = useSelector((state) => state.userAuth.token);

  useEffect(() => {
    dispatch(action.authCheckState());
    const selectedLng = localStorage.getItem("language");
    if (selectedLng)
      i18next.changeLanguage(selectedLng, (err) => {
        if (err) {
          const error = {
            message: "cant set language",
          };
          dispatch(action.errorCreator(error));
        }
      });
  }, [dispatch]);

  let routes = (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <ProtectedRoute path="/user-info/:userId" component={UserPageInfo} />
        <ProtectedRoute path="/users-list" component={AllUsers} />
        <ProtectedRoute path="/chat" component={VideoChat} />
        <ProtectedRoute path="/friend-requests" component={FriendRequest} />
        <ProtectedRoute path="/update-profile" component={UserUpdate} />
        <ProtectedRoute path="/" exact component={Dashboard} />
        <Route path="/activation/:token" component={EmailActivation} />
        {isAuth ? null : <Route path="/login" component={Login} />}
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );

  return (
    <div className="App">
      <Layout>
        <Toast isShow={error} message={error && error.message} />
        {routes}
      </Layout>
    </div>
  );
}

export default withRouter(App);
