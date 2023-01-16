import React from "react";
import TextEditor from "../../components/sharedUi/TextEditor/TextEditor";

const RadioquestionObj = ({
  questionObj,
  handleQuestionChange,
  handleAnswerChange,
  handleAddNewAnswer,
  handleDeleteAnswer,
}) => {
  return (
    <>
      <TextEditor
        handleEditorChange={handleQuestionChange}
        initialValue={questionObj?.title}
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

export default RadioquestionObj;
