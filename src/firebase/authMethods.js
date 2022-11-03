import { auth } from "./";
// import History from "./../routes/History";

function signup(email, password) {
  return auth().createUserWithEmailAndPassword(email, password);
}

function signin(email, password) {
    console.log('logedin with email')

  return auth().signInWithEmailAndPassword(email, password);
}

function signInWithGoogle() {
    console.log('logedin with google')

  const provider = new auth.GoogleAuthProvider();
  return auth().signInWithPopup(provider);
}

const firebaseSignout = () => {
  auth()
    .signOut()
    .then((res) => {
        console.log('logedout')
    //   localStorage.clear();
      //   History.push("/Login");
    })
    .catch((err) => {
      console.error(err.message);
    });
};

export { signup, signin, signInWithGoogle, firebaseSignout };
