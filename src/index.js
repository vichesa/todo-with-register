import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import store, { persistor } from "./store/store";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { PersistGate } from "redux-persist/integration/react";
import "./components/AddTodo/main.css"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
