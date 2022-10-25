import React from "react";

const RadioQuestionTemplate = ({
  questionTemplate,
  handleQuestionChange,
  handleAnswerChange,
  questionIndex,
  handleAddNewAnswer,
  handleDeleteAnswer,
}) => {
  return (
    <>
      <input
        defaultValue={questionTemplate.questionContent}
        onChange={handleQuestionChange}
      />
      <br />
      <h2 onClick={(e) => handleAddNewAnswer(e, questionIndex)}>add answer</h2>
      {questionTemplate?.answers.map((ans, answerIndex) => (
        <div key={`question-${questionIndex}-answer-${ans?.id}`}>
          <input
            defaultValue={ans?.content}
            name={`question-${questionIndex}-answer-${ans?.id}`}
            onChange={(e) =>
              handleAnswerChange(e, questionIndex, answerIndex, "radio")
            }
          />

          {questionTemplate?.answers.length > 1 && (
            <span
              onClick={(e) => handleDeleteAnswer(e, questionIndex, answerIndex)}
            >
              delete
            </span>
          )}
        </div>
      ))}
      <hr />
    </>
  );
};

export default RadioQuestionTemplate;
