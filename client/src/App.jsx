import React, {Suspense} from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import './App.scss';

import { useTranslation } from 'react-i18next';
import Layout from "./HOC/Layout";
import Spinner from "./components/UI/Spinner/Spinner";

const AddJobOffer = React.lazy(()=> import("./containers/AddJobOffer"));
const Scheduler = React.lazy(()=> import("./containers/Scheduler"));

let routes = (
  <Switch>
    <Route path="/add-job-offer"><Suspense fallback={<Spinner />}><AddJobOffer /></Suspense></Route>
    <Route path="/schedule-interview"><Suspense fallback={<Spinner />}><Scheduler /></Suspense></Route>
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
