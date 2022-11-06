import React from "react";
import { Navigate } from "react-router-dom";
import Btn from "../controls/Btn/Btn";
import { firebaseSignout } from "../firebase/authMethods";
// import Footer from "../components/Footer/Footer";
// import Navigationbar from "../components/Navigationbar/Navigationbar";
import Auth from "../utils/Auth";

const PrivateRoute = ({ children }) => {
  const handleLogout = () => {
    firebaseSignout();
    Auth.signOut();
  };

  if (!Auth.isAuth()) {
    return <Navigate to="/login" replace />;
  } else {
    return (
      <>
        {/* <Navigationbar /> */}
        <Btn content="logout" handleClick={handleLogout} />
        {children}
        {/* <Footer /> */}
      </>
    );
  }
};
export default PrivateRoute;
