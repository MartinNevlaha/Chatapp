import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';

import "./i18n/i18n";

import store from "./store";


ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.Fragment>,
  document.getElementById('root')
);
