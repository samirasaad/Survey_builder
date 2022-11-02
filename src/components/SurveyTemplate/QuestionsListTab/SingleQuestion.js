import SharedTooltip from "../../../sharedUi/Tooltip/Tooltip";
import Button from "@mui/material/Button";
import Btn from "../../../controls/Btn/Btn";

const SingleQuestion = ({ question, handleModalState,className }) => {
  const renderQuestionType = (type) => {
    switch (type) {
      case 1:
        return "dropdown";
      case 2:
        return "radio";
      case 3:
        return "multiSelect";
      default:
        return;
    }
  };

  return (
    <div className={`d-flex ${className}`}>
      <p>{question.content}</p>
      <p>{renderQuestionType(question.type)}</p>
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
  );
};

export default SingleQuestion;
