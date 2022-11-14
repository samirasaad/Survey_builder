import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuestionTypes from "../../components/questionTypes/questionTypes";
import QuestionTemplate from "../../components/QuestionTemplates/QuestionTemplate";
import RatingQuestionTemplate from "../../components/QuestionTemplates/RatingQuestionTemplate";

const AddEditQuestion = () => {
  const { questionId } = useParams();
  const [mode, setMode] = useState(questionId ? "edit" : "add");
  const [questionObj, setQuestionObj] = useState(null);

  useEffect(() => {
    if (mode === "add") {
      // add mode => default queston template is radio
      setQuestionObj(generateNewQuestionObj("radio"));
    } else if (mode === "edit") {
      // get obj from firestore and generte question obj whit its type and fill all its value
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  /****************************** handle answer text change *****************************/
  const handleAnswerChange = (e, answerIndex, questionType) => {
    switch (questionType) {
      case "radio":
      case "dropdown":
      case "multiSelect":
        let tempQuestionObj = JSON.parse(JSON.stringify(questionObj));
        tempQuestionObj.answers[answerIndex].content = e.target.value;
        setQuestionObj({ ...tempQuestionObj });
        break;

      default:
        return;
    }
  };

  /******************************* generate new question object ****************************/
  const generateNewQuestionObj = (questionType) => {
    switch (questionType) {
      case "dropdown":
      case "multiSelect":
      case "radio":
        return {
          questionContent: "",
          isRequired: false,
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

      case "rating":
        return {
          questionContent: "",
          isRequired: false,
          id: generateNewID("question"),
          questionType,
          ratingLimit: 3,
          ratingIcon: "hearts", //hearts || stars
        };

      default:
        return;
    }
  };

  /********************************** delete answer **********************/
  // only for drop down, radio, multi select questions
  const handleDeleteAnswer = (e, answerIndex) => {
    let tempQuestionObj = JSON.parse(JSON.stringify(questionObj));
    tempQuestionObj.answers.splice(answerIndex, 1);
    setQuestionObj({ ...tempQuestionObj });
  };

  const getQuestionComponent = () => {
    switch (questionObj?.questionType) {
      case "dropdown":
      case "multiSelect":
      case "radio":
        return (
          <div key={`question-${questionObj?.id}`}>
            <QuestionTemplate
              questionObj={questionObj}
              handleAnswerChange={handleAnswerChange}
              handleAddNewAnswer={handleAddNewAnswer}
              handleDeleteAnswer={handleDeleteAnswer}
              handleQuestionChange={handleQuestionChange}
            />
          </div>
        );

      case "rating":
        return <RatingQuestionTemplate questionObj={questionObj} />;

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
    let tempQuestionObj = JSON.parse(JSON.stringify(questionObj));
    tempQuestionObj.questionContent = editorHtmlVal;
    setQuestionObj({ ...tempQuestionObj });
  };

  /************** generate new id [ generatorType => question or answer ] ***************/
  const generateNewID = (generatorType) => {
    return `${generatorType}-${generateRandomNum(5)}-${generateRandomNum(
      5
    )}-${generateRandomNum(5)}`;
  };

  /************************************ add new answer *********************************/
  // only for drop down, radio, multi select questions
  const handleAddNewAnswer = (e) => {
    let tempQuestionObj = JSON.parse(JSON.stringify(questionObj));
    tempQuestionObj.answers.push({
      content: "",
      id: generateNewID("answer"),
    });
    setQuestionObj({ ...tempQuestionObj });
  };

  /********************* adding new question to template questions list *****************/
  const addQuestion = (e, questionType) => {
    console.log(questionType);
    setQuestionObj(generateNewQuestionObj(questionType));
    // if its the first question to be added isStart
    // to know the survey start point
  };

  return (
    <div className="row">
      <div className="col-md-3">
        <QuestionTypes addQuestion={addQuestion} />
      </div>

      <div className="col-md-6">
        {getQuestionComponent(questionObj?.questionType)}
      </div>

      <div className="col-md-3">
        <p>Popover</p>
      </div>
    </div>
  );
};

export default AddEditQuestion;
