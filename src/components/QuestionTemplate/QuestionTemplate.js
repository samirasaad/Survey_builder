import React from "react";
import TextEditor from "../../sharedUi/TextEditor/TextEditor";

const RadioquestionObj = ({
  questionObj,
  handleQuestionChange,
  handleAnswerChange,
  handleAddNewAnswer,
  handleDeleteAnswer,
}) => {
  return (
    <>
      <TextEditor handleEditorChange={handleQuestionChange} />
      <br />
      <h2 onClick={(e) => handleAddNewAnswer(e)}>add answer</h2>
      {questionObj?.answers.map((ans, answerIndex) => (
        <div key={`question-${questionObj.id}-answer-${ans?.id}`}>
          <input
            defaultValue={ans?.content}
            name={`question-${questionObj.id}-answer-${ans?.id}`}
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

export default RadioquestionObj;
