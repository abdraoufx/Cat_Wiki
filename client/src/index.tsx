import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AllCatsBreedsContext from "./contexts/AllCatsBreedsContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AllCatsBreedsContext>
        <App />
      </AllCatsBreedsContext>
    </BrowserRouter>
  </React.StrictMode>
);
