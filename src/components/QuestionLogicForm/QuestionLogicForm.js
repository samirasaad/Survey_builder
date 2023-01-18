import { useNavigate, useParams } from "react-router-dom";
import { DB } from "../../firebase";
import Btn from "../../controls/Btn/Btn";
import SelectMenu from "../../controls/SelectMenu/SelectMenu";
import PopoverComponent from "../../components/sharedUi/PopOver/PopOver";
import { useEffect, useState } from "react";
import {
  setDoc,
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";

import { BASIC_INFO, LOGIC } from "./../../utils/constants";

const QuestionLogicForm = () => {
  const navigate = useNavigate();
  const [popOverState, setPopOverState] = useState(false);
  const { questionId, templateId } = useParams();
  const [questionLogicObj, setQuestionLogicObj] = useState(null);
  const [questionBasicInfoObj, setQuestionBasicInfoObj] = useState(null);
  const [answersOptions, setAnswersOptions] = useState(null);
  const [questionsList, setQuestionsList] = useState(null);

  /* we need question basic info to get answers to use them in logic rules
    we need questions list to use them in go to/ skip questions list in logic rules */

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getQuestionLogic();
      getQuestionBasicInfo();
    }
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateId, questionId, popOverState]);

  useEffect(() => {
    if (questionBasicInfoObj) {
      /************************** to list all possible next questions *******************/
      getQuestionsList();
      /******************  and question answers to make question logic conditions ********/
      // if question has answers => radio, multiSelect,dropdown
      // if has ratingLimit => rating question hasLabels || no
      let optionsList =
        //  questionBasicInfoObj.answers?.length
        //   ? questionBasicInfoObj.answers
        //   : questionBasicInfoObj.hasLabels
        //   ? [...new Array(questionBasicInfoObj.ratingLimit)].map(
        //       (elem, index) => ({
        //         value: `${index + 1}`,
        //         label: questionBasicInfoObj.labels[index + 1].val,
        //       })
        //     )
        //   :
        [...new Array(questionBasicInfoObj?.ratingLimit)].map(
          (rate, index) => ({
            value: index + 1,
            label: index + 1,
          })
        );

      setAnswersOptions([...optionsList]);
    }
  }, [questionBasicInfoObj]);

  /******************** get list of questions => basicinfo and question id only  *************/
  const getQuestionsList = async () => {
    // get list once [no real time updates subscription]
    let tempList = [];
    const querySnapshot = await getDocs(collection(DB, BASIC_INFO));
    querySnapshot.forEach((doc) => {
      let tempElem = document.createElement("div");
      tempElem.innerHTML = doc.data().title;
      tempList = [
        ...tempList,
        {
          value: doc.data().id,
          label: tempElem.innerText,
        },
      ];
      setQuestionsList([...tempList]);
    });
  };
  /******************************* getting current question basic info *************************/
  const getQuestionBasicInfo = async () => {
    const docRef = doc(
      DB,
      BASIC_INFO,
      `${localStorage.getItem("uid")}-${templateId}-${questionId}`
    );
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setQuestionBasicInfoObj(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  /******************************** getting current question logic  ************************/
  const getQuestionLogic = async () => {
    const docRef = doc(
      DB,
      LOGIC,
      `${localStorage.getItem("uid")}-${templateId}-${questionId}`
    );
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("question data:", docSnap.data());
      setQuestionLogicObj(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  // condition type
  const conditioningTypesOptions = [
    {
      label: "If",
      value: "if",
    },
    {
      label: "Always",
      value: "always",
    },
  ];

  // actions
  const appliedActionsOptions = [
    {
      label: "Skip",
      value: "skip",
    },
    {
      label: "Go to",
      value: "goTo",
    },
    {
      label: "End survey",
      value: "endSurvey",
    },
  ];

  // condition statment
  const getEquailtyOptions = () => {
    console.log(questionBasicInfoObj?.questionType);
    switch (questionBasicInfoObj?.questionType) {
      case "rating":
        return [
          {
            label: "Equals to",
            value: "equalsTo",
          },
          {
            label: "Not equals to",
            value: "notEqualsTo",
          },
          {
            label: "Greater than",
            value: "greaterThan",
          },
          {
            label: "Greater than or equals",
            value: "greaterThanOrEquals",
          },
          {
            label: "less than",
            value: "lessThan",
          },
          {
            label: "less than or equals",
            value: "lessThanOrEquals",
          },
        ];
      //for radio, single select and multi select
      default:
        return [
          {
            label: "Is",
            value: "is",
          },
          {
            label: "Is not",
            value: "isNot",
          },
        ];
    }
  };

  const addNewCondition = () => {
    let tempquestionLogicObj = JSON.parse(JSON.stringify(questionLogicObj));
    tempquestionLogicObj.conditions = [
      ...tempquestionLogicObj.conditions,
      {
        condition: getEquailtyOptions()[0],
        action: {
          label: "Go to",
          value: "goTo",
        },
        nextQuestion: {
          label: null,
          value: null,
        },
        selectedAnswer: {
          label: null,
          value: null,
        },
      },
    ];
    setQuestionLogicObj({ ...tempquestionLogicObj });
  };

  const deleteCondition = (e, condIndex) => {
    let tempquestionLogicObj = JSON.parse(JSON.stringify(questionLogicObj));
    tempquestionLogicObj.conditions.splice(condIndex, 1);
    setQuestionLogicObj({ ...tempquestionLogicObj });
  };

  const handleOptionChange = (val, optionType, condIndex = 0) => {
    let tempquestionLogicObj = JSON.parse(JSON.stringify(questionLogicObj));
    console.log(optionType);
    switch (optionType) {
      case "conditioningType":
        tempquestionLogicObj.conditioningType = val;
        tempquestionLogicObj.conditions[condIndex].condition = {
          label: null,
          value: null,
        };
        tempquestionLogicObj.conditions[condIndex].selectedAnswer = {
          label: null,
          value: null,
        };
        tempquestionLogicObj.conditions[condIndex].action = {
          label: null,
          value: null,
        };
        tempquestionLogicObj.conditions[condIndex].nextQuestion = {
          label: null,
          value: null,
        };
        break;
      case "condition":
        tempquestionLogicObj.conditions[condIndex].condition = val;
        tempquestionLogicObj.conditions[condIndex].selectedAnswer = {
          label: null,
          value: null,
        };
        tempquestionLogicObj.conditions[condIndex].action = {
          label: null,
          value: null,
        };
        tempquestionLogicObj.conditions[condIndex].nextQuestion = {
          label: null,
          value: null,
        };
        break;
      case "selectedAnswer":
        tempquestionLogicObj.conditions[condIndex].selectedAnswer = val;
        tempquestionLogicObj.conditions[condIndex].action = {
          label: null,
          value: null,
        };
        tempquestionLogicObj.conditions[condIndex].nextQuestion = {
          label: null,
          value: null,
        };
        break;
      case "action":
        tempquestionLogicObj.conditions[condIndex].action = val;
        tempquestionLogicObj.conditions[condIndex].nextQuestion = {
          label: null,
          value: null,
        };
        break;
      case "question":
        tempquestionLogicObj.conditions[condIndex].nextQuestion = val;
        break;
      default:
        return;
    }
    console.log(tempquestionLogicObj);
    setQuestionLogicObj({ ...tempquestionLogicObj });
  };

  const renderConditions = () => {
    return questionLogicObj?.conditions.map((cond, index) => {
      return (
        <div key={`logic-condition-${index}`}>
          {questionLogicObj?.conditioningType?.value === "if" && (
            <div>
              <p> Response is</p>
              {/* Condition itself => equality condition */}
              <div>
                <span>equality</span>
                <SelectMenu
                  options={getEquailtyOptions()}
                  defaultValue={cond.condition}
                  value={cond.condition}
                  handleOptionChange={(e) =>
                    handleOptionChange(e, "condition", index)
                  }
                />
              </div>
              <div>
                {/* the answer which selected will make the condition true  */}
                <span>answer</span>
                <SelectMenu
                  options={answersOptions}
                  defaultValue={cond.selectedAnswer}
                  value={cond.selectedAnswer}
                  handleOptionChange={(e) =>
                    handleOptionChange(e, "selectedAnswer", index)
                  }
                />
              </div>
            </div>
          )}
          {/* Applied action skip || got to || end survey  */}
          <p>Apply this action</p>
          <SelectMenu
            options={appliedActionsOptions}
            defaultValue={cond.action}
            value={cond.action}
            handleOptionChange={(e) => handleOptionChange(e, "action", index)}
          />
          {/* questions list [choose questio to skip or to move forward to it] */}
          {(cond.action?.value === "goTo" || cond.action?.value === "skip") && (
            <>
              <p>Question</p>
              <SelectMenu
                options={questionsList}
                defaultValue={cond.nextQuestion}
                value={cond.nextQuestion}
                handleOptionChange={(e) =>
                  handleOptionChange(e, "question", index)
                }
              />
            </>
          )}
          {questionLogicObj?.conditions.length > 1 && (
            <p onClick={(e) => deleteCondition(e, index)}>delte condition</p>
          )}
        </div>
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit", questionLogicObj);
    // get doc ref
    let templateQuestionsRef = doc(
      DB,
      LOGIC,
      `${localStorage.getItem("uid")}-${templateId}-${
        questionBasicInfoObj?.questionId
      }`
    );
    // always setDoc
    // if first time to add logic ||  overWriting the existing logic object
    await setDoc(templateQuestionsRef, {
      ownerId: localStorage.getItem("uid"),
      templateId,
      questionId: questionLogicObj?.id,
      ...questionLogicObj,
    })
      .then((res) => console.log("success"))
      .catch((err) => {
        console.log(err);
      });
  };

  // cancel editing in edit || add question [for both form [basic info | logic info]]
  const handleCancelEditingQuestion = () => {
    console.log("cancel");
    navigate(`/template/${templateId}`);
  };

  const handleRemoveAll = () => {
    let tempquestionLogicObj = JSON.parse(JSON.stringify(questionLogicObj));
    tempquestionLogicObj.conditioningType = {
      label: null,
      value: null,
    };
    tempquestionLogicObj.conditions = [
      {
        condition: {
          label: null,
          value: null,
        },
        action: {
          label: null,
          value: null,
        },
        nextQuestion: {
          label: null,
          value: null,
        },
        selectedAnswer: {
          label: null,
          value: null,
        },
      },
    ];
    console.log(tempquestionLogicObj);
    setQuestionLogicObj({ ...tempquestionLogicObj });
  };

  const handlePopOverModalState = (e) => {
    setPopOverState(!popOverState);
  };

  const renderPopOverContent = () => (
    <form onSubmit={(e) => handleSubmit(e, "logicForm")}>
      {/* Conditioning type [if || always] */}
      <SelectMenu
        options={conditioningTypesOptions}
        defaultValue={questionLogicObj?.conditioningType}
        value={questionLogicObj?.conditioningType}
        handleOptionChange={(e) => handleOptionChange(e, "conditioningType")}
      />
      {/* Render logic conditions */}
      <div className="d-flex">
        {questionLogicObj && <div>{renderConditions()}</div>}
        {questionLogicObj?.conditioningType?.value === "if" && (
          <p onClick={addNewCondition}>add condition</p>
        )}
      </div>
      {/* Actions */}
      <div className="logic-actions-btns">
        <Btn content="Save" handleClick={handleSubmit} type="submit" />
        <Btn content="Cancel" handleClick={handleCancelEditingQuestion} />
        <Btn content="Remove all" handleClick={handleRemoveAll} />
      </div>
    </form>
  );

  return (
    <>
      <div className="col-md-3">
        {<p onClick={(e) => handlePopOverModalState(e)}>logic</p>}
      </div>
      {/* Logic popover */}
      {popOverState && (
        <PopoverComponent
          isOpen={popOverState}
          handlePopOverModalState={handlePopOverModalState}
          renderPopOverContent={renderPopOverContent}
        />
      )}
    </>
  );
};

export default QuestionLogicForm;
