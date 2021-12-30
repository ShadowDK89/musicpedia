import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";
/* import { store } from './redux/store';
import { rrfProps } from './redux/store'; */

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <ReactReduxFirebaseProvider {...rrfProps}> */}
      <App />
      {/* </ReactReduxFirebaseProvider> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
