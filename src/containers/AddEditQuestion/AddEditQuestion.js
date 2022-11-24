import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuestionTypes from "../../components/questionTypes/questionTypes";
import QuestionTemplate from "../../components/QuestionTemplates/QuestionTemplate";
import RatingQuestionTemplate from "../../components/QuestionTemplates/RatingQuestionTemplate";
import PopoverComponent from "../../components/sharedUi/PopOver/PopOver";
import LogicConditions from "../../components/LogicConditions/LogicConditions";
import AdvancedOptions from "../../components/AdvancedOptions/AdvancedOptions";

const AddEditQuestion = () => {
  const { questionId } = useParams();
  const [mode, setMode] = useState(questionId ? "edit" : "add");
  const [popOverState, setPopOverState] = useState(false);
  const [popOverType, setPopOverType] = useState(null);

  const [questionObj, setQuestionObj] = useState(null);
  const [hasLabels, setHasLabels] = useState(false);

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

  /************************* handle is rating component has labels , getting labels *********************/
  const handleIsRatingHasLabels = (val) => {
    setHasLabels(val.target.checked);
    getRatingLabels(questionObj?.ratingLimit);
  };

  /******************************* rating change ************************/
  const handleRatingChange = (e, newVal) => {
    setQuestionObj({ ...questionObj, rate: newVal });
  };

  const getRatingLabels = (ratingLimit) => {
    switch (ratingLimit) {
      case 3:
        setQuestionObj({
          ...questionObj,
          labels: {
            1: { val: null, placeholder: "Poor" },
            2: { val: null, placeholder: "Good" },
            3: { val: null, placeholder: "Excellent" },
          },
        });
        break;
      case 5:
        setQuestionObj({
          ...questionObj,
          labels: {
            1: { val: null, placeholder: "Useless" },
            2: { val: null, placeholder: "Poor" },
            3: { val: null, placeholder: "Ok" },
            4: { val: null, placeholder: "Good" },
            5: { val: null, placeholder: "Excellent" },
          },
        });
        break;

      case 10:
        setQuestionObj({
          ...questionObj,
          labels: {
            1: { val: null, placeholder: "Useless" },
            2: { val: null, placeholder: "Useless+" },
            3: { val: null, placeholder: "Poor" },
            4: { val: null, placeholder: "Poor+" },
            5: { val: null, placeholder: "Ok" },
            6: { val: null, placeholder: "Ok+" },
            7: { val: null, placeholder: "Good" },
            8: { val: null, placeholder: "Good+" },
            9: { val: null, placeholder: "Excellent" },
            10: { val: null, placeholder: "Excellent+" },
          },
        });
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
          ratingLimit: 5,
          rate: 0,
          ratingIcon: "hearts", //hearts || stars
          hasLabels: hasLabels,
          labels: {},
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

  /******************************************* handle labels change **************************/
  const handleRatingLabelChange = (e, labelIndex) => {
    let tempQuestionObj = JSON.parse(JSON.stringify(questionObj));
    tempQuestionObj.labels[labelIndex + 1].val = e.target.value;
    setQuestionObj({ ...tempQuestionObj });
  };

  /******************************* get question template  ***********************************/
  const renderQuestion = () => {
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
        return (
          <RatingQuestionTemplate
            questionObj={questionObj}
            hasLabels={hasLabels}
            handleIsRatingHasLabels={handleIsRatingHasLabels}
            handleRatingChange={handleRatingChange}
            handleRatingLabelChange={handleRatingLabelChange}
          />
        );

      default:
        return;
    }
  };

  /**************  generate random number to generate id for both [question and answer] *********/
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

  const renderPopOverContent = () => {
    switch (popOverType) {
      case "advanced-options":
        return <AdvancedOptions />;
      case "logic":
        return <LogicConditions questionObj={questionObj} />;
      default:
        return;
    }
  };

  const handlePopOverModalState = (e, type) => {
    setPopOverState(!popOverState);
    setPopOverType(type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <div className="row">
      {/* Questions types */}
      <div className="col-md-3">
        <QuestionTypes addQuestion={addQuestion} />
      </div>

      {/* render question template [with or without data according to mode add || edit] */}
      <form className="col-md-6" onSubmit={handleSubmit}>
        {renderQuestion(questionObj?.questionType)}
      </form>
      {/* Actions [advanced options || logic] */}
      <div className="col-md-3">
        <p
          onClick={(e) => handlePopOverModalState(e, "advanced-options")}
          // onClick={(e) => renderPopOverContent(e, "advanced-options")}
        >
          advanced
        </p>
        <p onClick={(e) => handlePopOverModalState(e, "logic")}>logic</p>
      </div>
      {/* Popover */}
      {popOverState && (
        <PopoverComponent
          isOpen={popOverState}
          handlePopOverModalState={handlePopOverModalState}
          renderPopOverContent={renderPopOverContent}
        />
      )}
    </div>
  );
};

export default AddEditQuestion;
