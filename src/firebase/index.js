import { initializeApp } from "firebase/app";
import "firebase/compat/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "firebase/compat/storage";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfigObj = {
  apiKey: "AIzaSyBRsvkF-B1HnZnWq2_elVo6a83x4jBuDfY",
  authDomain: "survey-builder-cb66b.firebaseapp.com",
  projectId: "survey-builder-cb66b",
  storageBucket: "survey-builder-cb66b.appspot.com",
  messagingSenderId: "54128773133",
  appId: "1:54128773133:web:45467541e5362f1adf2d44",
  measurementId: "G-PQF3Y74TP2",
};

// Initialize Firebase
const App = initializeApp(firebaseConfigObj);
const DB = getFirestore(App);
// Initialize Firebase Authentication and get a reference to the service
const Auth = getAuth(App);
//const storage = getStorage(app);
// const analytics = getAnalytics(App);
export { DB, Auth };
