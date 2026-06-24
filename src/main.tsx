import App from "./components/App/App";
import React from "react";
import ReactDOM from "react-dom/client";

// ----------------------------------------------
// Нормалізація стилів (declarations.d.ts)
import "modern-normalize";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
