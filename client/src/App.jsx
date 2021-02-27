import React, { useEffect } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import "./App.scss";
import Layout from "./HOC/Layout";
import Toast from "./components/UI/Toast/Toast";
import ProtectedRoute from "./Router/ProtectedRoute";
import * as action from "./store/actions";

import EmailActivation from "./containers/EmailActivation";
import Login from "./containers/Login";
import Chat from "./containers/Chat";


let routes = (
  <Switch>
    <ProtectedRoute path="/chat" component={Chat}/>
    <Route path="/activation/:token" component={EmailActivation} />
    <Route path="/" component={Login} exact /> 
    <Redirect to="/" />
  </Switch>
);

function App() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.requestStatus.error);
  const success = useSelector((state) => state.requestStatus.success);

  useEffect(() => {
    dispatch(action.authCheckState());
  }, [dispatch]);

  const { t } = useTranslation();
  return (
    <div className="App">
      <Layout>
        <Toast
          isShow={error || success}
          isSuccess={success ? true : false}
          message={error ? error.data.message : success}
        />
        {routes}
      </Layout>
    </div>
  );
}

export default withRouter(App);
