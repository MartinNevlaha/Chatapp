import React, { Suspense, useEffect } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import "./App.scss";
import Layout from "./HOC/Layout";
import Spinner from "./components/UI/Spinner/Spinner";
import Toast from "./components/UI/Toast/Toast";
import * as action from "./store/actions";

const EntryPage = React.lazy(() => import("./containers/EntryPage"));
const EmailActivation = React.lazy(() =>
  import("./containers/EmailActivation")
);
const Chat = React.lazy(() => import("./containers/Chat"));

let routes = (
  <Switch>
    <Route
      path="/activation/:token"
      render={() => (
        <Suspense fallback={<Spinner />}>
          <EmailActivation />
        </Suspense>
      )}
    />
        <Route
      path="/chat"
      render={() => (
        <Suspense fallback={<Spinner />}>
          <Chat />
        </Suspense>
      )}
    />
    <Route
      path="/"
      exact
      render={() => (
        <Suspense fallback={<Spinner />}>
          <EntryPage />
        </Suspense>
      )}
    />
    <Redirect to="/" />
  </Switch>
);

function App() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.requestStatus.error);
  const success = useSelector((state) => state.requestStatus.success);

  useEffect(() => {
    dispatch(action.authCheckState());
  }, [dispatch])

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
