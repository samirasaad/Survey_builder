import { Navigate } from "react-router-dom";
import Auth from "../utils/Auth";

const PublicRoute = ({ children }) => {
  if (!Auth.isAuth()) {
    return <>{children}</>;
  } else {
    return (
      <Navigate
        to={
          localStorage.getItem("onwerTemplateId") !== "null"
            ? `/template/${localStorage.getItem("onwerTemplateId")}`
            : "/"
        }
        replace
      />
    );
  }
};
export default PublicRoute;
