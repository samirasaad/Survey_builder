import React from "react";
import AppRoutes from "./routes/Routes";
// import { createBrowserHistory } from 'history';
// import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";
import "./App.scss";

import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import history from './routes/history';


const App = () => (
  <HistoryRouter history={history}>

  {/* // <BrowserRouter > */}
    {/* <MaterialSnackbar {...snackbarInfo} /> */}
    {AppRoutes}
  {/* </BrowserRouter> */}
  </HistoryRouter>
);

export default App;
