import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import loadable from "@loadable/component";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import SurveyTemplate from "../containers/SurveyTemplate/SurveyTemplate";
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

const NoSurveyTemplateFound = loadable(
  () => import("../containers/NoSurveyTemplateFound/NoSurveyTemplateFound"),
  {
    fallback: "..loading",
  }
);

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

    {/*   owner has no survey template */}
    <Route
      element={
        <Suspense fallback="..loading">
          <PrivateRoute>
            <NoSurveyTemplateFound />
          </PrivateRoute>
        </Suspense>
      }
      path="/"
    />

    {/* *********************************** view survey template screen [questions &  branching flow  tabs]  *******************************/}
    <Route
      element={
        <Suspense fallback="..loading">
          <PrivateRoute>
            <SurveyTemplate />
          </PrivateRoute>
        </Suspense>
      }
      path="/template/:templateId"
    />

    {/* ********************************* Add/Edit questions **********************************/}
    <Route
      element={
        <Suspense fallback="..loading">
          <PrivateRoute>
            <AddEditQuestion />
          </PrivateRoute>
        </Suspense>
      }
      path="/question/:templateId" //add new question
    >
      <Route
        element={
          <Suspense fallback="..loading">
            <PrivateRoute>
              <AddEditQuestion />
            </PrivateRoute>
          </Suspense>
        }
        path=":questionId" //edit question
      />
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
