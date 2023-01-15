import React from "react";

const QuestionTypes = ({ addQuestion, className }) => {
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
      type: "rating",
      id: 4,
    },
  ];

  return (
    <div className={className}>
      {questionTypes.map((t) => (
        <div key={t.id} onClick={(e) => addQuestion(e, t.type)}>
          <p>{t.type}</p>
        </div>
      ))}
    </div>
  );
};

export default QuestionTypes;
