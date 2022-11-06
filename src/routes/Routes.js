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

const Signup = loadable(() => import("../containers/SignUp/SignUp"), {
  fallback: "..loading",
});

const Home = loadable(() => import("../containers/Home/Home"), {
  fallback: "..loading",
});

const AddEditQuestion = loadable(
  () => import("../containers/AddEditQuestion/AddEditQuestion"),
  {
    fallback: "..loading",
  }
);

const PreviewTemplate = loadable(
  () => import("../containers/PreviewTemplate/PreviewTemplate"),
  {
    fallback: "..loading",
  }
);

// const NotFound = loadable(() => import("../components/NotFound/NotFound"), {
//   fallback:'..loading',
// });

/** 
 public routes => Unauthnticated (public) routes
 private routes => for Authnticated users only [private routes]
 **/

const AppRoutes = (
  <Routes>
    {/*************************************  login **********************************/}
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

    {/***************************************  Sign up **********************************/}

    <Route
      element={
        <Suspense fallback="..loading">
          {/* <Navigationbar /> */}
          <PublicRoute>
            <Signup />
          </PublicRoute>
          {/* <Footer /> */}
        </Suspense>
      }
      path="/signUp"
    />

    {/***************************************  Home **********************************/}

    <Route
      element={
        <Suspense fallback="..loading">
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        </Suspense>
      }
      // path="/" => owner has no survey template
      path="/"
    >
      <Route
        element={
          <Suspense fallback="..loading">
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          </Suspense>
        }
        // path="/template/1" => view template questions
        // path="/question/1" => add new question in a template //nooooo
        path=":type/:templateId"
      />

      {/* <Route
        element={
          <Suspense fallback="..loading">
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          </Suspense>
        }
        // path="/question/1/1" => edit existing question in a template
        path=":type/:templateId/:questionId"
      /> */}
    </Route>

    {/*************************************  Preview template **********************************/}

    <Route
      element={
        <Suspense fallback="..loading">
          <PrivateRoute>
            <PreviewTemplate />
          </PrivateRoute>
        </Suspense>
      }
      path="/preview"
    >
      <Route
        element={
          <Suspense fallback="..loading">
            <PrivateRoute>
              <PreviewTemplate />
            </PrivateRoute>
          </Suspense>
        }
        path=":templateId"
      />
    </Route>

    {/************************************* Add/Edit question **********************************/}

    {/* <Route
      element={
        <Suspense fallback="..loading">
          <PrivateRoute>
            <AddEditQuestion />
          </PrivateRoute>
        </Suspense>
      }
      path="preview/:templateId"
    /> */}

    {/*************************************  Not found **********************************/}

    <Route
      element={
        <Suspense fallback="..loading">
          <p>not found</p>
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
