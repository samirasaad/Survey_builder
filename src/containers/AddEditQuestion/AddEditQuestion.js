import React, { useState } from "react";
import QuestionTypes from "../../components/questionTypes/questionTypes";
import RadioQuestionTemplate from "../../components/RadioQuestionTemplate/RadioQuestionTemplate";
import TextEditor from "../../sharedUi/TextEditor/TextEditor";

const AddEditQuestion = () => {
  const [templateQuestionsList, setTemplateQuestionsList] = useState([]);

  /****************************** handle answer text change *****************************/
  const handleAnswerChange = (e, questionIndex, answerIndex, questionType) => {
    switch (questionType) {
      case "radio":
      case "dropDown":
      case "multiSelect":
        let tempQuestionsList = JSON.parse(
          JSON.stringify(templateQuestionsList)
        );
        tempQuestionsList[questionIndex].answers[answerIndex].content =
          e.target.value;
        setTemplateQuestionsList([...tempQuestionsList]);
        break;

      default:
        return;
    }
  };

  /********************************** delete answer **********************/
  // only for drop down, radio, multi select questions
  const handleDeleteAnswer = (e, questionIndex, answerIndex) => {
    let tempQuestionsList = JSON.parse(JSON.stringify(templateQuestionsList));
    tempQuestionsList[questionIndex].answers.splice(answerIndex, 1);
    setTemplateQuestionsList([...tempQuestionsList]);
  };

  const getQuestionComponnet = (ques, questionIndex) => {
    switch (ques.questionType) {
      case "dropDown":
        return <div key={`question-${questionIndex}`}>drop down</div>;
      case "multiSelect":
        return <div key={`question-${questionIndex}`}>multi</div>;
      case "radio":
        return (
          <div key={`question-${questionIndex}`}>
            <RadioQuestionTemplate
              questionTemplate={ques}
              questionIndex={questionIndex}
              handleAnswerChange={handleAnswerChange}
              handleAddNewAnswer={handleAddNewAnswer}
              handleDeleteAnswer={handleDeleteAnswer}
              handleQuestionChange={(e) =>
                handleQuestionChange(e, questionIndex)
              }
            />
          </div>
        );

      default:
        return;
    }
  };

  //   generate random number to generate id for both [question and answer]
  const generateRandomNum = (num) => {
    return `${Math.random().toFixed(num).split(".")[1]}`;
  };

  /***************************** handle question text change ****************************/
  const handleQuestionChange = (e, editorHtmlVal) => {
    console.log(e);
    console.log(editorHtmlVal);
    // let tempQuestionsList = JSON.parse(JSON.stringify(templateQuestionsList));
    // tempQuestionsList[questionIndex].questionContent = e.target.value;
    // setTemplateQuestionsList([...tempQuestionsList]);
  };

  /************** generate new id [ generatorType => question or answer ] ***************/
  const generateNewID = (generatorType) => {
    return `${generatorType}-${generateRandomNum(5)}-${generateRandomNum(
      5
    )}-${generateRandomNum(5)}`;
  };

  /************************************ add new answer *********************************/
  // only for drop down, radio, multi select questions
  const handleAddNewAnswer = (e, questionIndex) => {
    let tempQuestionsList = JSON.parse(JSON.stringify(templateQuestionsList));
    tempQuestionsList[questionIndex].answers.push({
      content: "",
      id: generateNewID("answer"),
    });
    setTemplateQuestionsList([...tempQuestionsList]);
  };

  /******************************* geerate new question object ****************************/
  const generateNewQuestionObj = (questionType) => {
    switch (questionType) {
      case "dropDown":
      case "multiSelect":
      case "radio":
        return {
          questionContent: "",
          id: generateNewID("question"),
          questionType,
          answers: [
            {
              id: generateNewID("answer"),
              content: "Yes",
            },
            {
              id: generateNewID("answer"),
              content: "No",
            },
          ],
        };

      default:
        return;
    }
  };

  /********************* adding new question to template questions list *****************/
  const addQuestion = (e, questionType) => {
    let questionTemplate = generateNewQuestionObj(questionType);
    // if its the first question to be added
    // to know the survey start point
    questionTemplate.isStart = templateQuestionsList.length === 0;
    setTemplateQuestionsList([...templateQuestionsList, questionTemplate]);
  };

  return (
    <div className="row">
      <div className="col-md-3">
        <QuestionTypes addQuestion={addQuestion} />
      </div>

      <div className="col-md-6">
        <TextEditor handleEditorChange={handleQuestionChange} />
      </div>

      <div className="col-md-3">
        <p>Popover</p>
      </div>
    </div>
  );
};

export default AddEditQuestion;
