import { useEffect, useState } from "react";
import Modal from "../../../components/sharedUi/Modal/Modal";
import SingleQuestion from "./SingleQuestion";
import Btn from "./../../../controls/Btn/Btn";

const QuestionsListTab = ({ questionsList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewType, setViewType] = useState("List"); // List || Grid
  const [questionId, setQuestionId] = useState(null);

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

  return questionsList ? (
    questionsList.length > 0 ? (
      <>
        <div className="d-flex">
          <Btn content="Grid" handleClick={(e) => handleViewType(e, "Grid")} />
          <Btn content="List" handleClick={(e) => handleViewType(e, "List")} />
        </div>
        <div className="row">
          {questionsList.map((question) => (
            <SingleQuestion
              className="single-question col-12"
              question={question}
              key={`question-${question.questionId}`}
              handleModalState={handleModalState}
            />
          ))}
        </div>
        <Modal
          isOpen={isOpen}
          renderModalContent={(e) => renderModalContent(e)}
          handleModalState={handleModalState}
        />
      </>
    ) : (
      <p>no questions found start yoour survey</p>
    )
  ) : (
    <p>loading</p>
  );
};

export default QuestionsListTab;
