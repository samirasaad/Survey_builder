import Btn from "../../controls/Btn/Btn";

const QuestionBasicInfoForm = ({
  handleSubmit,
  renderQuestion,
  handleCancelEditingQuestion,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {renderQuestion()}
      <Btn content="Save" handleClick={handleSubmit} type="submit" />
      <Btn content="Cancel" handleClick={handleCancelEditingQuestion} />
    </form>
  );
};

export default QuestionBasicInfoForm;
