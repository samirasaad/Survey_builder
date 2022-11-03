import history from "../routes/history";

const Auth = {
  signOut() {
    localStorage.clear();
    history.push("/login");
  },
  isAuth() {
    return localStorage.getItem("isRegistered");
  },
};
export default Auth;
