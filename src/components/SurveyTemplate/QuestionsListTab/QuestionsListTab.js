import React, { useState } from "react";
import Button from "../../../controls/Button/Button";
import Modal from "../../../sharedUi/Modal/Modal";
import SingleQuestion from "./SingleQuestion";

const QuestionsListTab = ({ questionsList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [questionID, setQuestionID] = useState(null);

  const handleModalState = (e, modalState, questionID) => {
    setQuestionID(questionID);
    setIsOpen(modalState);
  };

  const handleDeleteQuestion = () => {
    console.log(questionID);
  };

  const renderModalContent = () => (
    <>
      <p>Are you sure you want to delete this question ? </p>
      <div className="d-flex">
        <Button content="Yes" handleClick={handleDeleteQuestion} />
        <Button
          content="No"
          handleClick={(e) => handleModalState(e, false, null)}
        />
      </div>
    </>
  );

  return questionsList ? (
    questionsList.length > 0 ? (
      <>
        {questionsList.map((question) => (
          <div className="d-flex">
            <SingleQuestion question={question} key={question.id} />
            <Button
              className="mx-2"
              handleClick={(e) => handleModalState(e, true, question.id)}
              content="edit"
            />
            <Button
              className="mx-2"
              handleClick={(e) => handleModalState(e, true, question.id)}
              content="duplicate"
            />
            <Button
              className="mx-2"
              handleClick={(e) => handleModalState(e, true, question.id)}
              content="delete"
            />
          </div>
        ))}
        <Modal
          isOpen={isOpen}
          renderModalContent={(e) => renderModalContent(e)}
          handleModalState={handleModalState}
          // handleSubmit={handleDeleteQuestion}
          // handleCancel={(e)=>handleModalState(e,false)}
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
