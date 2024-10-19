import React from "react";
import "../src/styles/global.scss"
import './styles/bootstrap.min.css';
import "./styles/color.css";
import "./styles/font.css";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import { Provider } from 'react-redux';
import "./styles/tailwind.css";
import "./styles/index.css";
import { store, persistor } from './Actions/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
