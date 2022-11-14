import React from "react";

const QuestionTypes = ({ addQuestion }) => {
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
    {
      type: "rate",
      id: 4,
    },
  ];

  return (
    <>
      {questionTypes.map((t) => (
        <div key={t.id} onClick={(e) => addQuestion(e, t.type)}>
          <p>{t.type}</p>
        </div>
      ))}
    </>
  );
};

export default QuestionTypes;
