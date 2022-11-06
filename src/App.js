import React from "react";
import AppRoutes from "./routes/Routes";
// import { createBrowserHistory } from 'history';
// import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import "./App.scss";

import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import History from "./routes/History";

const App = () => (
  <HistoryRouter history={History}>
    {/* // <BrowserRouter > */}
    {/* <MaterialSnackbar {...snackbarInfo} /> */}
    {AppRoutes}
    {/* </BrowserRouter> */}
  </HistoryRouter>
);

export default App;
