import Btn from "../../controls/Btn/Btn";
import { DB } from "../../firebase";
import {
  setDoc,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { BASIC_INFO, LOGIC } from "../../utils/constants";
import {
  generateNewID,
  generateNewQuestionLogicObj,
  generateNewQuestionObj,
} from "../../utils/shared";
import RatingQuestionTemplate from "../QuestionTemplates/RatingQuestionTemplate";
import { useNavigate } from "react-router-dom";
import QuestionTemplate from "../../components/QuestionTemplates/QuestionTemplate";
import { useEffect, useState } from "react";
import QuestionTypes from "../questionTypes/questionTypes";

const QuestionBasicInfoForm = ({ mode, templateId, questionId }) => {
  const navigate = useNavigate();
  const [questionObj, setQuestionObj] = useState(null);
  /* to get list length to handle : 
   1- isStart for the first question
   2- in add mode new question number*/
  const [questionsListBasicInfo, setQuestionsListBasicInfo] = useState(null);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getQuestionsListBasicInfo(); //list of basic info
      // add mode => default question template is radio
      if (mode === "add") {
        setQuestionObj(generateNewQuestionObj("radio"));
      } else if (mode === "edit" && questionId) {
        getQuestionBasicInfo();
      }
    }
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, questionId]);

  /**********************************  get list of questions [basic info]  *****************************/
  const getQuestionsListBasicInfo = async () => {
    // get list once [no real time updates subscription]
    let tempQuestionsList = [];
    // JSON.parse(JSON.stringify(questionsListBasicInfo)) || [];
    const q = query(
      collection(DB, BASIC_INFO),
      where("templateId", "==", localStorage.getItem("templateId"))
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      tempQuestionsList = [...tempQuestionsList, doc.data()];

      /* sort questions list ascending according to its timestamp [creation date/time]
       not sorted propely in firestore because firestore sorting docs 
       as per its numerica/alphabetical doc id*/
    });

    tempQuestionsList = tempQuestionsList.sort(function (x, y) {
      return x.timestamp - y.timestamp;
    });

    setQuestionsListBasicInfo([...tempQuestionsList]);
  };

  // submit basic form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === "add") {
      /**************************  create basic info doc *********************/
      // get doc ref
      let questionDocRef = doc(
        DB,
        BASIC_INFO,
        `${localStorage.getItem("uid")}-${templateId}-${questionObj?.id}`
      );
      // always setDoc because in add mode we always creating new doc
      await setDoc(questionDocRef, {
        ownerId: localStorage.getItem("uid"),
        templateId,
        questionId: questionObj.id,
        timestamp: Math.floor(new Date().getTime() / 1000),
        isStart: questionsList?.length ? false : true,
        ...questionObj,
      })
        .then((res) => {
          console.log("adding new doc for basic info successed");
          /*********************************** after creating basic info,   create logic doc in another collection ********************/
          // get doc ref
          let questionLogicDocRef = doc(
            DB,
            LOGIC,
            `${localStorage.getItem("uid")}-${templateId}-${questionObj?.id}`
          );
          // always setDoc because in add mode we always creating new doc
          setDoc(questionLogicDocRef, {
            ownerId: localStorage.getItem("uid"),
            templateId,
            // // isStart: questionsList?.length ? false : true,
            ...generateNewQuestionLogicObj(
              questionObj.questionType,
              questionObj.id,
              questionObj.questionType === "rating"
                ? { value: "", label: "" }
                : null
            ),
          })
            .then((res) => navigate(`/template/${templateId}`))
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (mode === "edit") {
      // we can use setDoc here also, cause we will rewrite the whole basic info object in the doc
      // get doc ref
      let questionDocRef = doc(
        DB,
        BASIC_INFO,
        `${localStorage.getItem("uid")}-${templateId}-${questionId}`
      );
      await updateDoc(questionDocRef, {
        ownerId: localStorage.getItem("uid"),
        templateId,
        questionId: questionObj.id,
        ...questionObj,
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

  // cancel editing in edit || add question [for both form [basic info | logic info]]
  const handleCancelEditingQuestion = () => {
    console.log("cancel");
    navigate(`/template/${templateId}`);
  };

  const getRatingLabels = () => {
    switch (questionObj?.ratingLimit) {
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
              handleIsRequired={handleIsRequired}
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
    tempQuestionObj.title = editorHtmlVal;
    setQuestionObj({ ...tempQuestionObj });
  };

  /********************************** delete answer **********************/
  // only for drop down, radio, multi select questions
  const handleDeleteAnswer = (e, answerIndex) => {
    let tempQuestionObj = JSON.parse(JSON.stringify(questionObj));
    tempQuestionObj.answers.splice(answerIndex, 1);
    setQuestionObj({ ...tempQuestionObj });
  };

  /************************************ add new answer *********************************/
  // only for drop down, radio, multi select questions
  const handleAddNewAnswer = (e) => {
    let tempQuestionObj = JSON.parse(JSON.stringify(questionObj));
    tempQuestionObj.answers.push({
      label: "",
      value: generateNewID("answer"),
    });
    setQuestionObj({ ...tempQuestionObj });
  };

  /********************* adding new question to template questions list *****************/
  const addQuestion = (e, questionType) => {
    setQuestionObj(generateNewQuestionObj(questionType));
    // if its the first question to be added isStart
    // to know the survey start point
  };

  /******************************* getting question basic info *************************/
  const getQuestionBasicInfo = async () => {
    const docRef = doc(
      DB,
      BASIC_INFO,
      `${localStorage.getItem("uid")}-${templateId}-${questionId}`
    );
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setQuestionObj(docSnap.data());
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
        console.log("answerIndex", answerIndex);
        console.log("questionType", questionType);
        console.log("tempQuestionObj", tempQuestionObj);
        console.log("e.target.value", e.target.value);

        tempQuestionObj.answers[answerIndex].label = e.target.value;
        setQuestionObj({ ...tempQuestionObj });
        break;
      default:
        return;
    }
  };

  /************** handle is rating component has labels and getting labels **************/
  const handleIsRatingHasLabels = (e) => {
    let tempQuestionObj = JSON.parse(JSON.stringify(questionObj));
    tempQuestionObj.hasLabels = e.target.checked;
    tempQuestionObj.labels = { ...getRatingLabels() };
    setQuestionObj({ ...tempQuestionObj });
  };

  /*************************  handle question isRequired  ******************/
  const handleIsRequired = (e) => {
    console.log(e.target.checked);
    setQuestionObj({ ...questionObj, isRequired: e.target.checked });
  };

  return (
    <div className="col-md-9">
      {/****************************** form title ******************************/}
      {console.log(
        questionsListBasicInfo?.findIndex(
          (q) => q.questionId === questionObj?.questionId
        )
      )}
      <p>{mode === "add" ? " Add new question" : "Edit question"}</p>
      {/**************************  question number  ***************************/}
      {mode === "add" ? (
        <p>
          Q - {questionsListBasicInfo ? questionsListBasicInfo?.length + 1 : 1}
        </p>
      ) : (
        <p>
          Q -
          {questionsListBasicInfo?.findIndex(
            (q) => q.questionId === questionObj?.questionId
          ) + 1}
        </p>
      )}
      <div className="row">
        {/********************** Questions types ******************************/}
        <QuestionTypes addQuestion={addQuestion} className="col-md-3" />
        {/************************** basic info form  *************************/}
        <form onSubmit={handleSubmit} className="col-md-9">
          {renderQuestion()}
          {/************************** form actions ***************************/}
          <Btn content="Save" handleClick={handleSubmit} type="submit" />
          <Btn content="Cancel" handleClick={handleCancelEditingQuestion} />
        </form>
      </div>
    </div>
  );
};

export default QuestionBasicInfoForm;
