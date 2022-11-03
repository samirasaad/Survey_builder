import { auth } from "./";
// import Cookies from "js-cookie";

// function signinWithEm(email, password) {
//   return auth().signInWithEmailAndPassword(email, password);
// }

function signUpFirestore(email, password) {
  return auth().createUserWithEmailAndPassword(email, password);
}

function signInFirestore(provider, email, password) {
  const providerMethod =
    provider === "google"
      ? new auth.GoogleAuthProvider()
      : provider === "github" && new auth.GithubAuthProvider();

  return provider === "google" || provider === "github"
    ? auth().signInWithPopup(providerMethod)
    : provider === "email&password" &&
        auth().signInWithEmailAndPassword(email, password);
}

const firebaseSignout = () => {
  auth()
    .signOut()
    .then((res) => {
      // Cookies.remove("userInfo");
      // Router.push("/Login");
    })
    .catch((err) => {
      console.error(err.message);
    });
};

export { signInFirestore, firebaseSignout, signUpFirestore };
