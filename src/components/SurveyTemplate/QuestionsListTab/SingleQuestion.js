const SingleQuestion = ({ question }) => {
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
    <div className="d-flex">
      <p>{question.content}</p>
      <p>{renderQuestionType(question.type)}</p>
    </div>
  );
};

export default SingleQuestion;
