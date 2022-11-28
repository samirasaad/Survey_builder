import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DB } from "../../firebase";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";

import Modal from "../../components/sharedUi/Modal/Modal";
import { TEMPLATES } from "../../utils/constants";
import Btn from "../../controls/Btn/Btn";
import InputField from "../../controls/InputField/InputField";

const TemplateHeader = () => {
  const templateId =
    useParams().templateId || localStorage.getItem("templateId");
  const [templateData, setTemplateData] = useState(null); //from firestore
  const [isOpen, setIsOpen] = useState(false);
  const [templateTitle, setTemplateTitle] = useState(""); //component state

  const handleModalState = (e, modalState) => {
    setTemplateTitle("");
    setIsOpen(modalState);
  };

  const handleTitleChange = (e) => {
    setTemplateTitle(e.target.value);
    // let tempInput = JSON.parse(JSON.stringify(templateData));
    // tempInput.title = e.target.value;
    // setTemplateData({ ...tempInput });
  };

  const handleCancel = (e) => {
    setTemplateTitle("");
    handleModalState(e, false);
  };

  // update template title
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(DB, TEMPLATES, templateData?.id), {
        title: templateTitle,
      });
      handleModalState(e, false);
      setTemplateTitle("");
    } catch (errr) {
      console.log(errr);
    }
  };

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

  const renderModalContent = () => (
    <>
      <p>Update your survey template </p>
      <form onSubmit={handleSubmit}>
        <InputField
          id="template-title"
          label="Enter Survey title"
          type="text"
          variant="outlined"
          defaultValue={templateData?.title}
          handleChange={handleTitleChange}
        />
        <div>
          <Btn content="Save" handleClick={handleSubmit} type="submit" />
          <Btn content="Cancel" handleClick={handleCancel} />
        </div>
      </form>
    </>
  );

  return templateData?.title ? (
    <>
      <div className="d-flex">
        <p>{templateData?.title}</p>
        <span onClick={(e) => handleModalState(e, true)}>edit</span>
        {isOpen && (
          <Modal
            isOpen={isOpen}
            renderModalContent={(e) => renderModalContent(e)}
            handleModalState={handleModalState}
          />
        )}
      </div>
    </>
  ) : (
    <></>
  );
};

export default TemplateHeader;
