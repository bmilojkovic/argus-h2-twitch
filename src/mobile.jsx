import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { testingData } from "./util";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App isMobile={true} isDashboard={true} dashboardInfo={testingData} />
  </React.StrictMode>
);
