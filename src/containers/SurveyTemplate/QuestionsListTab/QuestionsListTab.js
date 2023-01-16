import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import Modal from "../../../components/sharedUi/Modal/Modal";
import SingleQuestion from "./SingleQuestion";
import Btn from "./../../../controls/Btn/Btn";
import { DB } from "./../../../firebase";
import { BASIC_INFO } from "./../../../utils/constants";

const QuestionsListTab = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewType, setViewType] = useState("List"); // List || Grid
  const [questionId, setQuestionId] = useState(null);
  const [questionsListBasicInfo, setQuestionsListBasicInfo] = useState(null);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getQuestionsBasicInfo();
    }
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /******************** get list of questions => basicinfo and question id only  *************/
  const getQuestionsBasicInfo = async () => {
    // get list once [no real time updates subscription]
    let tempList = JSON.parse(JSON.stringify(questionsListBasicInfo)) || [];
    const querySnapshot = await getDocs(collection(DB, BASIC_INFO));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      tempList = [...tempList, doc.data()];
      setQuestionsListBasicInfo([...tempList]);
    });
    /********************* subscriping for real updates [for specific doc] ***************/
    // onSnapshot(
    //   doc(
    //     DB,
    //     BASIC_INFO,
    //     "oP7uNHa5TfU04RMiCUQjZAF9b9r1-59066-57832-46135-81598-question-80677-07848-33078"
    //   ),
    //   (doc) => {
    //     console.log("Current data: ", doc.data());
    //   }
    // );
  };

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
