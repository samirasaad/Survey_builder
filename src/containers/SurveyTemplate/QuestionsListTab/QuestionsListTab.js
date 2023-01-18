import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import Modal from "../../../components/sharedUi/Modal/Modal";
import SingleQuestion from "./SingleQuestion";
import Btn from "./../../../controls/Btn/Btn";
import { DB } from "./../../../firebase";
import { BASIC_INFO } from "./../../../utils/constants";
import { getQuestionsListBasicInfo } from "../../../utils/shared";

const QuestionsListTab = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewType, setViewType] = useState("List"); // List || Grid
  const [questionId, setQuestionId] = useState(null);
  const [questionsListBasicInfo, setQuestionsListBasicInfo] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getQuestionsListBasicInfo();
    }
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (viewType === "Grid") {
      Array.from(document.querySelectorAll(".single-question")).forEach(
        (elem) => elem.classList.add("col-lg-4", "col-md-6")
      );
    } else if (viewType === "List") {
      Array.from(document.querySelectorAll(".single-question")).forEach(
        (elem) => elem.classList.remove("col-lg-4", "col-md-6")
      );
    }
  }, [viewType]);

  /********************************** get list of questions [basic info] *****************************/
  const getQuestionsListBasicInfo = async () => {
    // get list once [no real time updates subscription]
    let tempQuestionsList = [];
    const q = query(
      collection(DB, BASIC_INFO),
      where("templateId", "==", localStorage.getItem("templateId"))
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      tempQuestionsList = [...tempQuestionsList, doc.data()];

      /* sort questions list ascending according to its timestamp [creation date/time]
       not sorted propely in firestore because firestore sorting docs 
       as per its numerica/alphabetical doc id*/
    });

    tempQuestionsList = tempQuestionsList.sort(function (x, y) {
      return x.timestamp - y.timestamp;
    });

    setQuestionsListBasicInfo([...tempQuestionsList]);
  };

  const handleModalState = (e, modalState, questionId) => {
    console.log(questionId);
    setQuestionId(questionId);
    setIsOpen(modalState);
  };

  const handleDeleteQuestion = () => {
    console.log(questionId);
  };

  const renderModalContent = () => (
    <>
      <p>Are you sure you want to delete this question ? {questionId} </p>
      <div className="d-flex">
        <Btn content="Yes" handleClick={handleDeleteQuestion} />
        <Btn
          content="No"
          handleClick={(e) => handleModalState(e, false, null)}
        />
      </div>
    </>
  );

  const handleViewType = (e, type) => {
    setViewType(type);
  };

  return questionsListBasicInfo ? (
    questionsListBasicInfo.length > 0 ? (
      <>
        <div className="d-flex">
          <Btn content="Grid" handleClick={(e) => handleViewType(e, "Grid")} />
          <Btn content="List" handleClick={(e) => handleViewType(e, "List")} />
        </div>
        <div className="row">
          {questionsListBasicInfo.map((question) => (
            <SingleQuestion
              className="single-question col-12"
              question={question}
              key={`question-${question.questionId}`}
              handleModalState={handleModalState}
            />
          ))}
        </div>
        {isOpen && (
          <Modal
            isOpen={isOpen}
            renderModalContent={(e) => renderModalContent(e)}
            handleModalState={handleModalState}
          />
        )}
      </>
    ) : (
      <p>no questions found start yoour survey</p>
    )
  ) : (
    <p>loading</p>
  );
};

export default QuestionsListTab;
