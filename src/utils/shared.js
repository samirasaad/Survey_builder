import { DB } from "../firebase";
import { TEMPLATES } from "./constants";
import History from "./../routes/History";

const getOwnerSurveyTemplte = async (userId) => {
  DB.collection(TEMPLATES)
    .where("owner_id", "==", userId)
    .get()
    .then((querySnapshot) => {
      let isUserHasTemplate = null;
      // in case arrived to this line [ it means where condition is true otherwise,will not go through foreach function  ]
      querySnapshot.docs.forEach((doc) => {
        isUserHasTemplate = doc.data().owner_id;
        localStorage.setItem("templateId", doc.id);
        History.push(`/template/${doc.id}`);
      });
      // will execute this line if  isUserHasTemplate still null [where condition is false]
      !isUserHasTemplate && History.push(`/`);
    })
    .catch((err) => {
      console.log(err);
    });
};

export { getOwnerSurveyTemplte };
