import { Navigate } from "react-router-dom";
import Auth from "../utils/Auth";

const PublicRoute = ({ children }) => {
  if (!Auth.isAuth()) {
    return <>{children}</>;
  } else {
    return (
      <Navigate
        to={
          localStorage.getItem("templateId")
            ? `/template/${localStorage.getItem("templateId")}`
            : "/"
        }
        replace
      />
    );
  }
};
export default PublicRoute;
