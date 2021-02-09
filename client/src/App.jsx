import React, {Suspense} from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import './App.scss';

import { useTranslation } from 'react-i18next';
import Layout from "./HOC/Layout";
import Spinner from "./components/UI/Spinner/Spinner";



let routes = (
  <Switch>
    <Redirect to="/" />
  </Switch>
);

function App() {
  const {t} = useTranslation();
  return (
    <div className="App">
      <Layout>
        {routes}
      </Layout>
    </div>
  );
}

export default withRouter(App);
