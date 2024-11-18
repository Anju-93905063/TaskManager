import React from "react";
import ReactDOM from "react-dom"; // Ensure only one ReactDOM import here
import "./index.css"; // If you have any global styles
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css"; // Add this import in index.js

ReactDOM.render(
  <React.StrictMode>
    {" "}
    {/* Ensure that Router is wrapping the application */}
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
