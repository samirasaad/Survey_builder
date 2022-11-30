import SharedTooltip from "../../../components/sharedUi/Tooltip/Tooltip";
import Button from "@mui/material/Button";
import Btn from "../../../controls/Btn/Btn";
import { useEffect } from "react";

const SingleQuestion = ({ question, handleModalState, className }) => {
  useEffect(() => {
    renderQuestionAsHtml(question.title);
  }, [question]);

  const renderQuestionAsHtml = (htmlVal) => {
    const parentElm = document.querySelector("#question");
    if (parentElm) {
      parentElm.innerHTML = htmlVal;
    }
  };

  return (
    <div className={`d-flex ${className}`}>
      <p id="question"></p>
      {question?.isRequired && <span className="text-danger">*</span>}
      <p>{question?.questionType}</p>
      <SharedTooltip
        tooltipTargetElement={
          <Button
            onClick={(e) => handleModalState(e, true, question.questionId)}
          >
            Arrow
          </Button>
        }
        title="Edit question"
      />
      <Btn
        className="mx-2"
        handleClick={(e) => handleModalState(e, true, question.questionId)}
        content="duplicate"
      />
      <Btn
        className="mx-2"
        handleClick={(e) => handleModalState(e, true, question.questionId)}
        content="delete"
      />
    </div>
  );
};

export default SingleQuestion;
