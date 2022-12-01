import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuestionTypes from "../../components/questionTypes/questionTypes";
import QuestionTemplate from "../../components/QuestionTemplates/QuestionTemplate";
import RatingQuestionTemplate from "../../components/QuestionTemplates/RatingQuestionTemplate";
import PopoverComponent from "../../components/sharedUi/PopOver/PopOver";
import LogicConditions from "../../components/LogicConditions/LogicConditions";
import QuestionBasicInfoForm from "../../components/QuestionBasicInfoForm/QuestionBasicInfoForm";
import { BASIC_INFO } from "../../utils/constants";
import { generateNewID } from "../../utils/shared";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { DB } from "../../firebase";

const AddEditQuestion = () => {
  const navigate = useNavigate();
  const { questionId, templateId } = useParams();
  const [mode, setMode] = useState(questionId ? "edit" : "add");
  const [popOverState, setPopOverState] = useState(false);
  const [questionObj, setQuestionObj] = useState(null);

  useEffect(() => {
    if (questionId) {
      setMode("edit");
    }
  }, [questionId]);

  useEffect(() => {
    let mounted = true;
    if (mode === "add") {
      // add mode => default question template is radio
      setQuestionObj(generateNewQuestionObj("radio"));
    } else if (mode === "edit" && questionId) {
      // get obj from firestore and genert setQuestionObj(generateNewQuestionObj("radio"));e question obj whith its type and fill all its value
      if (mounted) {
        getQuestionObjFirestore();
      }
    }
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, questionId]);

  const getQuestionObjFirestore = async () => {
    const docRef = doc(
      DB,
      BASIC_INFO,
      `${localStorage.getItem("uid")}-${templateId}-${questionId}`
    );
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("question data:", docSnap.data());
      setQuestionObj({ ...questionObj, basicInfo: docSnap.data() });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  /****************************** handle answer text change *****************************/
  const handleAnswerChange = (e, answerIndex, questionType) => {
    switch (questionType) {
      case "radio":
      case "dropdown":
      case "multiSelect":
        let tempQuestionObj = JSON.parse(JSON.stringify(questionObj));
        tempQuestionObj.basicInfo.answers[answerIndex].content = e.target.value;
        setQuestionObj({ ...tempQuestionObj });
        break;
      default:
        return;
    }
  };

  /************************* handle is rating component has labels , getting labels *********************/
  const handleIsRatingHasLabels = (e) => {
    let tempQuestionObj = JSON.parse(JSON.stringify(questionObj));
    tempQuestionObj.basicInfo.hasLabels = e.target.checked;
    tempQuestionObj.basicInfo.labels = { ...getRatingLabels() };
    setQuestionObj({ ...tempQuestionObj });
  };

  /******************************* rating change ************************/
  // const handleRatingChange = (e, newVal) => {
  //   setQuestionObj({ ...questionObj, ...questionObj?.basicInfo, rate: newVal });
  // };

  const getRatingLabels = () => {
    switch (questionObj?.basicInfo?.ratingLimit) {
      case 3:
        return {
          1: { val: null, placeholder: "Poor" },
          2: { val: null, placeholder: "Good" },
          3: { val: null, placeholder: "Excellent" },
        };
      case 5:
        return {
          1: { val: null, placeholder: "Useless" },
          2: { val: null, placeholder: "Poor" },
          3: { val: null, placeholder: "Ok" },
          4: { val: null, placeholder: "Good" },
          5: { val: null, placeholder: "Excellent" },
        };
      case 10:
        return {
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
        };
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
          id: generateNewID("question"),
          basicInfo: {
            title: "",
            isRequired: false,
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
          },
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
          id: generateNewID("question"),
          basicInfo: {
            title: "",
            isRequired: false,
            questionType,
            ratingLimit: 3,
            rate: 0,
            ratingIcon: "hearts", //hearts || stars
            hasLabels: false,
            labels: {},
          },
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

  /******************************************* handle labels change **************************/
  const handleRatingLabelChange = (e, labelIndex) => {
    let tempQuestionObj = JSON.parse(JSON.stringify(questionObj));
    tempQuestionObj.basicInfo.labels[labelIndex + 1].val = e.target.value;
    setQuestionObj({ ...tempQuestionObj });
  };

  /******************************* get question template  ***********************************/
  const renderQuestion = () => {
    switch (questionObj?.basicInfo?.questionType) {
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
            handleIsRatingHasLabels={handleIsRatingHasLabels}
            handleRatingLabelChange={handleRatingLabelChange}
            handleQuestionChange={handleQuestionChange}
          />
        );

      default:
        return;
    }
  };

  /***************************** handle question text change ****************************/
  const handleQuestionChange = (e, editorHtmlVal) => {
    let tempQuestionObj = JSON.parse(JSON.stringify(questionObj));
    tempQuestionObj.basicInfo.title = editorHtmlVal;
    setQuestionObj({ ...tempQuestionObj });
  };

  /********************************** delete answer **********************/
  // only for drop down, radio, multi select questions
  const handleDeleteAnswer = (e, answerIndex) => {
    let tempQuestionObj = JSON.parse(JSON.stringify(questionObj));
    tempQuestionObj.basicInfo.answers.splice(answerIndex, 1);
    setQuestionObj({ ...tempQuestionObj });
  };

  /************************************ add new answer *********************************/
  // only for drop down, radio, multi select questions
  const handleAddNewAnswer = (e) => {
    let tempQuestionObj = JSON.parse(JSON.stringify(questionObj));
    tempQuestionObj.basicInfo.answers.push({
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

  // cancel editing in edit || add question [for both form [basic info | logic info]]
  const handleCancelEditingQuestion = () => {
    console.log("cancel");
    navigate(`/template/${templateId}`);
  };

  const handleSubmit = async (e) => {
    console.log("hereeeeeeeeeee");
    e.preventDefault();
    if (mode === "add") {
      // get doc ref
      let templateQuestionsRef = doc(
        DB,
        BASIC_INFO,
        `${localStorage.getItem("uid")}-${templateId}-${questionObj?.id}`
      );
      // always setDoc
      // if first time to add logic ||  overWriting the existing logic object
      await setDoc(templateQuestionsRef, {
        ownerId: localStorage.getItem("uid"),
        templateId,
        questionId: questionObj.id,
        ...questionObj.basicInfo,
      })
        .then((res) => {
          console.log("success");
          navigate(`/template/${templateId}`);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (mode === "edit") {
      // we can use setDoc here also, cause we will rewrite the whole basic info object in the doc
      // get doc ref
      let templateQuestionsRef = doc(
        DB,
        BASIC_INFO,
        `${localStorage.getItem("uid")}-${templateId}-${questionId}`
      );
      await updateDoc(templateQuestionsRef, {
        ownerId: localStorage.getItem("uid"),
        templateId,
        questionId: questionObj.id,
        ...questionObj.basicInfo,
      })
        .then((res) => {
          console.log("success");
          navigate(`/template/${templateId}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="row">
      {/* Questions types */}
      <div className="col-md-3">
        <QuestionTypes addQuestion={addQuestion} />
      </div>
      {/* Render question template [with or without data according to mode add || edit] */}
      <div className="col-md-6">
        <QuestionBasicInfoForm
          handleSubmit={handleSubmit}
          renderQuestion={renderQuestion}
          handleCancelEditingQuestion={handleCancelEditingQuestion}
        />
      </div>
      <div className="col-md-3">
        <p onClick={(e) => handlePopOverModalState(e)}>logic</p>
      </div>
      {/* Logic popover */}
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
