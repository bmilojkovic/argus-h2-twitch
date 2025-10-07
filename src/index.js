import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ConfigPage from "./ConfigPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/index.js" element={<App />} />
        <Route path="/config.js" element={<ConfigPage />} />
        <Route path="/live_config.js" element={<App />} />
      </Routes>
      ;
    </BrowserRouter>
  </React.StrictMode>
);
