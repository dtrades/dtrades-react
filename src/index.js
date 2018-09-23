import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import { BrowserRouter, Route } from "react-router-dom";
ReactDOM.render(
  <BrowserRouter>
    <Route path='/:account' component={App}/>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
