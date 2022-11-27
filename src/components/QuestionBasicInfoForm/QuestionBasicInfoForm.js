import Btn from "../../controls/Btn/Btn";

const QuestionBasicInfoForm = ({
  handleSubmit,
  questionObj,
  renderQuestion,
}) => {
  return (
    <form onSubmit={(e) => handleSubmit(e, "basicInfoForm")}>
      {renderQuestion(questionObj?.questionType)}
      <Btn
        content="Save"
        handleClick={(e) => handleSubmit(e, "basicInfoForm")}
      />
    </form>
  );
};

export default QuestionBasicInfoForm;
