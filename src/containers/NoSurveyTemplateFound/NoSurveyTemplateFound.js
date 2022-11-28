import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import Modal from "../../components/sharedUi/Modal/Modal";
import Btn from "../../controls/Btn/Btn";
import InputField from "../../controls/InputField/InputField";
import { generateNewID } from "../../utils/shared";
import { DB } from "../../firebase";
import { TEMPLATES } from "../../utils/constants";

const Home = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [templateTitle, setTemplateTitle] = useState("");

  const handleModalState = (e, modalState) => {
    setTemplateTitle("");
    setIsOpen(modalState);
  };

  const handleTitleChange = (e) => {
    setTemplateTitle(e.target.value);
  };

  const handleCancel = (e) => {
    setTemplateTitle("");
    handleModalState(e, false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTemplateId = generateNewID();
    // creating new document for new template
    try {
      await setDoc(doc(DB, TEMPLATES, newTemplateId), {
        id: newTemplateId,
        ownerId: localStorage.getItem("uid"),
        title: templateTitle,
      });
      handleModalState(e, false);
      setTemplateTitle("");
      localStorage.setItem("templateId", newTemplateId);
      navigate(`/template/${newTemplateId}`);
    } catch (errr) {
      console.log(errr);
    }
  };

  const renderModalContent = () => (
    <>
      <p>Start creating your survey template </p>
      <form onSubmit={handleSubmit}>
        <InputField
          id="template-title"
          label="Enter Survey title"
          type="text"
          variant="outlined"
          defaultValue={templateTitle}
          handleChange={handleTitleChange}
        />
        <div>
          <Btn content="Save" handleClick={handleSubmit} type="submit" />
          <Btn content="Cancel" handleClick={handleCancel} />
        </div>
      </form>
    </>
  );

  return (
    <section>
      {
        <>
          <p>no template, Start building your survey</p>
          <p className="" onClick={(e) => handleModalState(e, true)}>
            Start creating
          </p>
          {isOpen && (
            <Modal
              isOpen={isOpen}
              renderModalContent={(e) => renderModalContent(e)}
              handleModalState={handleModalState}
            />
          )}
        </>
      }
    </section>
  );
};

export default Home;
