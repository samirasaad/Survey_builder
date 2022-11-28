import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DB } from "../../firebase";
import { TEMPLATES } from "../../utils/constants";

const TemplateHeader = () => {
  const templateId =
    useParams().templateId || localStorage.getItem("templateId");
  const [templateData, setTemplateData] = useState(null);

  useEffect(() => {
    let mounted = true;
    if (mounted && templateId) {
      getTemplateData();
    }
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateId]);

  const getTemplateData = () => {
    /****************** GETTING TEMPLATE DATA ONCE ON INTIALIZING COMPONENT *******************/
    // const docRef = doc(DB, TEMPLATES, localStorage.getItem("templateId"));
    // const docSnap = await getDoc(docRef);
    // if (docSnap.exists()) {
    //   setTemplateData({ ...docSnap.data() });
    //   console.log("Document data:", docSnap.data());
    // } else {
    //   // doc.data() will be undefined in this case
    //   console.log("No such document!");
    // }

    /**************** SUBSCRIBING ON ANY CHANGE AS LONG AS  USER IN THIS SCREEN ****************/
    if (templateId) {
      onSnapshot(doc(DB, TEMPLATES, templateId), (doc) => {
        if (doc.exists()) {
          console.log("Current data: ", doc.data());
          setTemplateData({ ...doc.data() });
        } else {
          console.log("No such document!");
        }
      });
    }
  };

  return templateData?.title ? <p>{templateData?.title}</p> : <></>;
};

export default TemplateHeader;
