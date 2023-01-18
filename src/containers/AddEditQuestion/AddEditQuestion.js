import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuestionTypes from "../../components/questionTypes/questionTypes";
import QuestionTemplate from "../../components/QuestionTemplates/QuestionTemplate";
import RatingQuestionTemplate from "../../components/QuestionTemplates/RatingQuestionTemplate";
import PopoverComponent from "../../components/sharedUi/PopOver/PopOver";
import QuestionLogicForm from "../../components/QuestionLogicForm/QuestionLogicForm";
import QuestionBasicInfoForm from "../../components/QuestionBasicInfoForm/QuestionBasicInfoForm";
import { BASIC_INFO } from "../../utils/constants";
import { generateNewID, generateNewQuestionObj } from "../../utils/shared";
import { collection, getDocs } from "firebase/firestore";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { DB } from "../../firebase";

const AddEditQuestion = () => {
  const navigate = useNavigate();
  const { questionId, templateId } = useParams();
  const [mode, setMode] = useState(questionId ? "edit" : "add");
  const [popOverState, setPopOverState] = useState(false);

  // getting mode => add || edit
  // useEffect(() => {
  //   let mounted = true;
  //   if (mounted) {
  //     getQuestionsList();
  //   }
  //   return () => {
  //     mounted = false;
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // /******************** get list of questions => basicinfo and question id only  *************/
  // const getQuestionsList = async () => {
  //   // get list once [no real time updates subscription]
  //   let tempList = JSON.parse(JSON.stringify(questionsList)) || [];
  //   const querySnapshot = await getDocs(collection(DB, BASIC_INFO));
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     tempList = [...tempList, doc.data()];
  //     setQuestionsList([...tempList]);
  //   });
  //   /********************* subscriping for real updates [for specific doc] ***************/
  //   // onSnapshot(
  //   //   doc(
  //   //     DB,
  //   //     BASIC_INFO,
  //   //     "oP7uNHa5TfU04RMiCUQjZAF9b9r1-59066-57832-46135-81598-question-80677-07848-33078"
  //   //   ),
  //   //   (doc) => {
  //   //     console.log("Current data: ", doc.data());
  //   //   }
  //   // );
  // };

  /******************************* rating change ************************/
  // const handleRatingChange = (e, newVal) => {
  //   setQuestionObj({ ...questionObj, ...questionObj?.basicInfo, rate: newVal });
  // };

  return (
    <>
      <div className="row">
        <QuestionBasicInfoForm
          mode={mode}
          templateId={templateId}
          questionId={questionId}
        />
        {/* we can add logic rules only in edit mode */}
        {mode === "edit" && <QuestionLogicForm className="col-md-3" />}
      </div>
    </>
  );
};

export default AddEditQuestion;
