import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import Swal from "sweetalert2";
import { FriendZProvider } from "./context/context";
window.Swal = Swal;

window.displayError = (error) => {
  Swal.fire({
    icon: "error",
    text: error || "something went wrong",
  });
};

const toast = Swal.mixin({
  toast: true,
  position: "top-end",
  timer: 3000,
  timerProgressBar: true,
  showConfirmButton: false,
  icon: "success",
});

window.Toast = toast;

ReactDOM.render(
  <FriendZProvider>
    <Router>
      <App />
    </Router>
  </FriendZProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
