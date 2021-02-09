import React, {Suspense} from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import './App.scss';

import { useTranslation } from 'react-i18next';
import Layout from "./HOC/Layout";
import Spinner from "./components/UI/Spinner/Spinner";

const EntryPage = React.lazy(() => import("./containers/EntryPage"));

let routes = (
  <Switch>
    <Route to="/" exact><Suspense fallback={<Spinner />}><EntryPage /></Suspense></Route>
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
