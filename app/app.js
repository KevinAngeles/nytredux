import "core-js/stable";
import "regenerator-runtime/runtime";
// Include the Main React Dependencies
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
// Include the Main Component
import Main from "./components/Main";

// Include Custom Style
import "./src/style/style.sass";

// Renders the contents according to the route page.
render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById("app")
);
