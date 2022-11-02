const TemplateQuestions = ({ templateQuestionsList, getQuestionComponnet }) => {
  return templateQuestionsList.map((ques, questionIndex) => {
    return getQuestionComponnet(ques, questionIndex);
  });
};

export default TemplateQuestions;
