import React from "react";
import AppRoutes from "./routes/Routes";
// import { createBrowserHistory } from 'history';
// import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";
import "./App.scss";

const App = () => (
  <BrowserRouter >
    {/* <MaterialSnackbar {...snackbarInfo} /> */}
    {AppRoutes}
  </BrowserRouter>
);

export default App;
