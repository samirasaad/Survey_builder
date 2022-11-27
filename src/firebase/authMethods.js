// import { Auth } from "./";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
  GithubAuthProvider,
  getAuth,
} from "firebase/auth";
import { Auth } from ".";
// const auth = getAuth();
// import Cookies from "js-cookie";

// function signinWithEm(email, password) {
//   return auth().signInWithEmailAndPassword(email, password);
// }

function signUpFirestore(email, password) {
  return createUserWithEmailAndPassword(Auth, email, password);
}

function signInFirestore(provider, email, password) {
  const providerMethod =
    provider === "google"
      ? new GoogleAuthProvider()
      : provider === "github" && new GithubAuthProvider();

  return provider === "google" || provider === "github"
    ? signInWithPopup(Auth, providerMethod)
    : provider === "email&password" &&
        signInWithEmailAndPassword(Auth, email, password);
}

const firebaseSignout = () => {
  signOut(Auth)
    .then((res) => {
      // Cookies.remove("userInfo");
      // Router.push("/Login");
    })
    .catch((err) => {
      console.error(err.message);
    });
};

export { signInFirestore, firebaseSignout, signUpFirestore };
