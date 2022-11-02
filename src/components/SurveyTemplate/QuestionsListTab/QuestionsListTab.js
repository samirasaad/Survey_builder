import React from "react";
import SingleQuestion from "./SingleQuestion";

const QuestionsListTab = ({ questionsList }) => {
  return questionsList ? (
    questionsList.length > 0 ? (
      questionsList.map((question) => (
        <SingleQuestion question={question} key={question.id} />
      ))
    ) : (
      <p>no questions found start yoour survey</p>
    )
  ) : (
    <p>loading</p>
  );
};

export default QuestionsListTab;
