import React from "react";
import { Navigate } from "react-router-dom";
// import Footer from "../components/Footer/Footer";
// import Navigationbar from "../components/Navigationbar/Navigationbar";
import Auth from "../utils/Auth";

const PrivateRoute = ({ children }) => {
  if (!Auth.isAuth()) {
    return <Navigate to="/login" replace />;
  } else {
    return (
      <>
        {/* <Navigationbar /> */}
        {children}
        {/* <Footer /> */}
      </>
    );
  }
};
export default PrivateRoute;
