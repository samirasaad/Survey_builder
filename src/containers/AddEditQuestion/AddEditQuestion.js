import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import QuestionTypes from "../../components/questionTypes/questionTypes";
import QuestionTemplate from "../../components/QuestionTemplates/QuestionTemplate";
import RatingQuestionTemplate from "../../components/QuestionTemplates/RatingQuestionTemplate";
import PopoverComponent from "../../components/sharedUi/PopOver/PopOver";
import LogicConditions from "../../components/LogicConditions/LogicConditions";
import QuestionBasicInfoForm from "../../components/QuestionBasicInfoForm/QuestionBasicInfoForm";
import { QUESTIONS, TEMPLATES } from "../../utils/constants";
import { generateNewID } from "../../utils/shared";
import {
  getFirestore,
  collection,
  setDoc,
  arrayUnion,
  doc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { DB } from "../../firebase";
import { async } from "@firebase/util";

const AddEditQuestion = () => {
  const navigate = useNavigate();
  const { questionId, templateId } = useParams();
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
          logic: {
            conditioningType: {
              label: "Always", //default
              value: "always",
            },
            conditions: [
              {
                condition: null,
                action: null,
                nextQuestion: null,
                selectedAnswer: null,
              },
            ],
          },
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
          logic: {
            conditioningType: {
              label: "If",
              value: "if",
            },
            conditions: [
              {
                condition: {
                  label: "Equals to",
                  value: "equalsTo",
                },
                action: {
                  label: "Go to",
                  value: "goTo",
                },
                nextQuestion: null,
                selectedAnswer: {
                  value: "",
                  label: "",
                },
              },
            ],
          },
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

  /***************************** handle question text change ****************************/
  const handleQuestionChange = (e, editorHtmlVal) => {
    let tempQuestionObj = JSON.parse(JSON.stringify(questionObj));
    tempQuestionObj.questionContent = editorHtmlVal;
    setQuestionObj({ ...tempQuestionObj });
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
    setQuestionObj(generateNewQuestionObj(questionType));
    // if its the first question to be added isStart
    // to know the survey start point
  };

  const renderPopOverContent = () => (
    <LogicConditions
      questionObj={questionObj}
      setQuestionObj={setQuestionObj}
    />
  );

  const handlePopOverModalState = (e) => {
    setPopOverState(!popOverState);
  };

  const handleSubmit = async (e, submitFormType) => {
    e.preventDefault();
    // get doc ref
    const templateQuestionsRef = doc(
      DB,
      QUESTIONS,
      `${localStorage.getItem("uid")}-${templateId}`
    );

    if (mode === "add") {
      switch (submitFormType) {
        case "logicForm":
          break;
        case "basicInfoForm":
          // arrayUnion => adds new value [not existed before] only [if exist will not be added]
          // updateDoc with arrayUnion will push questionObj to questions array
          // setDoc => create doc if not existed, or overwrites existing doc
          // setDoc with arrayUnion will overwrites the existing object
          await updateDoc(templateQuestionsRef, {
            ownerId: localStorage.getItem("uid"),
            templateId,
            questions: arrayUnion(questionObj),
          })
            .then((res) => navigate(`/template/${templateId}`))
            .catch(async (err) => {
              console.log(err);
              console.log("doc not found create it");
              // if failed updating doc,most probably because of doc not found
              // which means user has no template questions yet, so create it
              await setDoc(templateQuestionsRef, {
                ownerId: localStorage.getItem("uid"),
                templateId,
                questions: arrayUnion(questionObj),
              })
                .then((res) => navigate(`/template/${templateId}`))
                .catch((err) => {
                  console.log(err);
                });
            });
          ////////////////////////////////////////////////////////////////////////////
          break;
        default:
          return;
      }
    } else if (mode === "edit") {
    }
  };

  return (
    <div className="row">
      {/* Questions types */}
      <div className="col-md-3">
        <QuestionTypes addQuestion={addQuestion} />
      </div>
      {/* render question template [with or without data according to mode add || edit] */}
      <div className="col-md-6">
        <QuestionBasicInfoForm
          handleSubmit={handleSubmit}
          renderQuestion={renderQuestion}
          questionObj={questionObj}
        />
      </div>
      <div className="col-md-3">
        <p onClick={(e) => handlePopOverModalState(e)}>logic</p>
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
