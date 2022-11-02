import React, { useState } from "react";
import Modal from "../../../sharedUi/Modal/Modal";
import SharedTooltip from "../../../sharedUi/Tooltip/Tooltip";
import SingleQuestion from "./SingleQuestion";
import Button from "@mui/material/Button";
import Btn from "./../../../controls/Btn/Btn";

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
        <Btn content="Yes" handleClick={handleDeleteQuestion} />
        <Btn
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
            <SharedTooltip
              tooltipTargetElement={
                <Button onClick={(e) => handleModalState(e, true, question.id)}>
                  Arrow
                </Button>
              }
              title="Edit question"
            />

            <Btn
              className="mx-2"
              handleClick={(e) => handleModalState(e, true, question.id)}
              content="duplicate"
            />
            <Btn
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
