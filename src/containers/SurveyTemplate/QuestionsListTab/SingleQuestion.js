import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SharedTooltip from "../../../components/sharedUi/Tooltip/Tooltip";
import Button from "@mui/material/Button";
import Btn from "../../../controls/Btn/Btn";

const SingleQuestion = ({ question, handleModalState, className }) => {
  const navigate = useNavigate();
  const { templateId } = useParams();

  return (
    <div className={`d-flex ${className}`}>
      <p id="question" dangerouslySetInnerHTML={{ __html: question.title }}></p>
      {question?.isRequired && <span className="text-danger">*</span>}
      <p>{question?.basicInfo?.questionType}</p>
      <SharedTooltip
        tooltipTargetElement={
          <Button
            onClick={() =>
              navigate(`/question/${templateId}/${question?.questionId}`)
            }
          >
            Edit
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
