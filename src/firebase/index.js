import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getAnalytics } from "firebase/analytics";
const firebaseConfigObj = {
    apiKey: "AIzaSyBRsvkF-B1HnZnWq2_elVo6a83x4jBuDfY",
    authDomain: "survey-builder-cb66b.firebaseapp.com",
    projectId: "survey-builder-cb66b",
    storageBucket: "survey-builder-cb66b.appspot.com",
    messagingSenderId: "54128773133",
    appId: "1:54128773133:web:45467541e5362f1adf2d44",
    measurementId: "G-PQF3Y74TP2"
  };
  // firebase init
  const App =firebase.initializeApp(firebaseConfigObj);
  const DB = firebase.firestore();
  const analytics = getAnalytics(App);
  export default DB;
  