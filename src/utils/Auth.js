import { redirect } from "react-router-dom";

const Auth = {
  signOut() {
    localStorage.clear();
    return redirect("/login");
  },
  isAuth() {
    return localStorage.getItem("isRegistered");
  },
};
export default Auth;
