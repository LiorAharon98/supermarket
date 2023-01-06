import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import DataProvider from "./context/DataProvider";
import i18next from "./Language/LanguageData";
import { CookiesProvider } from "react-cookie";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DataProvider>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </DataProvider>
  </React.StrictMode>
);

reportWebVitals();
