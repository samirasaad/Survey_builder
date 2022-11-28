import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { DB } from "../../firebase";
import { TEMPLATES } from "../../utils/constants";

const TemplateHeader = () => {
  const [templateData, setTemplateData] = useState("");
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getTemplateData();
    }
    return () => {
      mounted = false;
    };
  }, []);

  const getTemplateData = async () => {
    /**************** GETTING TEMPLATE DATA ONCE ON INTIALIZING COMPONENT *************/
    // const docRef = doc(DB, TEMPLATES, localStorage.getItem("templateId"));
    // const docSnap = await getDoc(docRef);
    // if (docSnap.exists()) {
    //   setTemplateData({ ...docSnap.data() });
    //   console.log("Document data:", docSnap.data());
    // } else {
    //   // doc.data() will be undefined in this case
    //   console.log("No such document!");
    // }

    /**************** SUBSCRIBING ON ANY CHANGE AS LONG AS IN THIS SCREEN ****************/
    onSnapshot(
      doc(DB, TEMPLATES, localStorage.getItem("templateId")),
      (doc) => {
        if (doc.exists()) {
          console.log("Current data: ", doc.data());
          setTemplateData({ ...doc.data() });
        } else {
          console.log("No such document!");
        }
      }
    );
  };
  return templateData?.title && <p>{templateData?.title}</p>;
};

export default TemplateHeader;
