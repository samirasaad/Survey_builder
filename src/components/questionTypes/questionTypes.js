import React, { useState } from "react";
import RadioQuestionTemplate from "../RadioQuestionTemplate/RadioQuestionTemplate";

const QuestionTypes = ({addQuestion}) => {

  const questionTypes = [
    {
      type: "dropdown",
      id: 1,
    },
    {
      type: "multiSelect",
      id: 2,
    },
    {
      type: "radio",
      id: 3,
    },
  ];

  return (
    <>
      {questionTypes.map((q) => (
        <div key={q.id} onClick={(e) => addQuestion(e, "dropDown")}>
          <p>{q.type}</p>
        </div>
      ))}
    </>
  );
};

export default QuestionTypes;
