import React from "react";
import TextEditor from "../../components/sharedUi/TextEditor/TextEditor";

// QuestionTemplate  is template for radio, single select[dropdown] and multi select questions
const QuestionTemplate = ({
  questionObj,
  handleQuestionChange,
  handleAnswerChange,
  handleAddNewAnswer,
  handleDeleteAnswer,
  handleIsRequired,
}) => {
  return (
    <>
      <TextEditor
        handleEditorChange={handleQuestionChange}
        initialValue={questionObj?.title}
      />
      <br />
      <label>Is required</label>
      <input
        onChange={handleIsRequired}
        type="checkbox"
        checked={questionObj?.isRequired}
      />
      <br />

      <h2 onClick={(e) => handleAddNewAnswer(e)}>add answer</h2>
      {questionObj?.answers.map((ans, answerIndex) => (
        <div key={`question-${questionObj.id}-answer-${ans?.value}`}>
          <input
            defaultValue={ans?.label}
            name={`question-${questionObj.id}-answer-${ans?.value}`}
            onChange={(e) => handleAnswerChange(e, answerIndex, "radio")}
          />

          {questionObj?.answers.length > 1 && (
            <span onClick={(e) => handleDeleteAnswer(e, answerIndex)}>
              delete
            </span>
          )}
        </div>
      ))}
      <hr />
    </>
  );
};

export default QuestionTemplate;
