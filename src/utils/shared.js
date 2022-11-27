import { DB } from "../firebase";
import { TEMPLATES } from "./constants";
import History from "./../routes/History";
import { collection, query, where, getDocs } from "firebase/firestore";

const handleHomeRedirection = async (userId) => {
  console.log(userId);
  let { ownerId, templateId } = await getTemplateIds(userId);
  console.log("sss");

  if (ownerId) {
    console.log(ownerId);
    // in case arrived to this line [ it means where condition is true otherwise,will not go through foreach function  ]
    localStorage.setItem("templateId", templateId);
    History.push(`/template/${templateId}`);
  } else {
    console.log("sss");
    History.push(`/`);
  }
};

const getTemplateIds = async (userId) => {
  let ownerId = null;
  let templateId = null;

  try {
    const q = query(collection(DB, TEMPLATES), where("ownerId", "==", userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      ownerId = doc.data().ownerId;
      templateId = doc.id;
    });
    console.log("nlknk");
  } catch (err) {
    console.log(err);
  }

  // await DB.collection(TEMPLATES)
  //   .where("ownerId", "==", userId)
  //   .get()
  //   .then((querySnapshot) => {
  //     // in case arrived to this line [ it means where condition is true otherwise,will not go through foreach function  ]
  //     querySnapshot.docs.forEach((doc) => {
  //       console.log("bjbjbjk");
  //       ownerId = doc.data().ownerId;
  //       templateId = doc.id;
  //     });
  //   })
  // .catch((err) => {
  //   console.log(err);
  // });
  return { ownerId, templateId };
};

/************** generate new id [ generatorType => question or answer ] ***************/
const generateNewID = (generatorType) => {
  return `${
    generatorType ? generatorType : generateRandomNum(5)
  }-${generateRandomNum(5)}-${generateRandomNum(5)}-${generateRandomNum(5)}`;
};

/**************  generate random number to generate id for both [question and answer] *********/
const generateRandomNum = (num) => {
  return `${Math.random().toFixed(num).split(".")[1]}`;
};

export { handleHomeRedirection, generateNewID };
