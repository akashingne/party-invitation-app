import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.min.css";
import "alertifyjs/build/css/alertify.css";
import MainProvider from "./Context/MainProvider";

ReactDOM.render(
  <MainProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MainProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
