import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import loadable from "@loadable/component";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
// const Navigationbar = loadable(
//   () => import("../components/Navigationbar/Navigationbar"),
//   {
//     fallback: <Spinner />,
//   }
// );
// const Footer = loadable(() => import("../components/Footer/Footer"), {
//   fallback: <Spinner />,
// });

const Login = loadable(() => import("../containers/Login/Login"), {
  fallback: "..loading",
});

const Home = loadable(() => import("../containers/Home/Home"), {
  fallback: "..loading",
});

// const NotFound = loadable(() => import("../components/NotFound/NotFound"), {
//   fallback:'..loading',
// });

/** 
 public routes => Unauthnticated (public) routes
 private routes => for Authnticated users only [private routes]
 **/

const AppRoutes = (
  <Routes>
    <Route
      index
      element={
        <Suspense fallback="..loading">
          {/* <Navigationbar /> */}
          <PublicRoute>
            <Login />
          </PublicRoute>
          {/* <Footer /> */}
        </Suspense>
      }
      path="/login"
    />

    <Route
      element={
        <Suspense fallback="..loading">
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        </Suspense>
      }
      path="/"
    />

    {/* NOT FOUND */}
    <Route
      element={
        <Suspense fallback="..loading">
          {/* <Navigationbar /> */}
          {/* <NotFound /> */}
          {/* <Footer /> */}
        </Suspense>
      }
      path="*"
    />
  </Routes>
);
export default AppRoutes;
