import React from "react";
import { Navigate } from "react-router-dom";
import SideMenu from "../components/SideMenu/SideMenu";
import TemplateHeader from "../components/TemplateHeader/TemplateHeader";
import Btn from "../controls/Btn/Btn";
import { firebaseSignout } from "../firebase/authMethods";
// import Footer from "../components/Footer/Footer";
// import Navigationbar from "../components/Navigationbar/Navigationbar";
import Auth from "../utils/Auth";

const PrivateRoute = ({ children }) => {
  const templateId = localStorage.getItem("templateId");
  const handleLogout = () => {
    firebaseSignout();
    Auth.signOut();
  };

  // not auth
  if (!Auth.isAuth()) {
    return <Navigate to="/login" replace />;
  } else {
    //auth
    if (templateId && window.location.pathname === "/") {
      return <Navigate to={`/template/${templateId}`} replace />;
    } else if (
      (!templateId && window.location.pathname.includes("/template/")) ||
      (!templateId && window.location.pathname.includes("/question/"))
    ) {
      return <Navigate to="/" replace />;
    } else {
      return (
        <>
          <TemplateHeader />
          <Btn content="logout" handleClick={handleLogout} />
          <div className="row">
            <div className="col-md-2">
              <SideMenu />
            </div>
            <div className="col-md-10">{children}</div>
          </div>

          {/* <Footer /> */}
        </>
      );
    }
  }
};
export default PrivateRoute;
