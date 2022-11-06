import History from "../routes/History";

const Auth = {
  signOut() {
    localStorage.clear();
    History.push("/login");
  },
  isAuth() {
    return localStorage.getItem("isRegistered");
  },
};
export default Auth;
