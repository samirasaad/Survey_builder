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
  const [questionObj, setQuestionObj] = useState(null);
  const [questionBasicInfoObj, setQuestionBasicInfoObj] = useState(null);
  const [answersOptions, setAnswersOptions] = useState(null);
  const [questionsList, setQuestionsList] = useState(null);

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
          isRequired: doc.data().isRequired,
          questionType: doc.data().questionType,
        },
      ];
      setQuestionsList([...tempList]);
    });
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
      setQuestionBasicInfoObj(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  // getting question logic
  const getQuestionLogic = async () => {
    const docRef = doc(
      DB,
      LOGIC,
      `${localStorage.getItem("uid")}-${templateId}-${questionId}`
    );
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("question data:", docSnap.data());
      setQuestionObj(docSnap.data());
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
    let tempQuestionObj = JSON.parse(JSON.stringify(questionObj));
    tempQuestionObj.conditions = [
      ...tempQuestionObj.conditions,
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
    setQuestionObj({ ...tempQuestionObj });
  };

  const deleteCondition = (e, condIndex) => {
    let tempQuestionObj = JSON.parse(JSON.stringify(questionObj));
    tempQuestionObj.conditions.splice(condIndex, 1);
    setQuestionObj({ ...tempQuestionObj });
  };

  const handleOptionChange = (val, optionType, condIndex = 0) => {
    let tempQuestionObj = JSON.parse(JSON.stringify(questionObj));
    console.log(optionType);
    switch (optionType) {
      case "conditioningType":
        tempQuestionObj.conditioningType = val;
        tempQuestionObj.conditions[condIndex].condition = {
          label: null,
          value: null,
        };
        tempQuestionObj.conditions[condIndex].selectedAnswer = {
          label: null,
          value: null,
        };
        tempQuestionObj.conditions[condIndex].action = {
          label: null,
          value: null,
        };
        tempQuestionObj.conditions[condIndex].nextQuestion = {
          label: null,
          value: null,
        };
        break;
      case "condition":
        tempQuestionObj.conditions[condIndex].condition = val;
        tempQuestionObj.conditions[condIndex].selectedAnswer = {
          label: null,
          value: null,
        };
        tempQuestionObj.conditions[condIndex].action = {
          label: null,
          value: null,
        };
        tempQuestionObj.conditions[condIndex].nextQuestion = {
          label: null,
          value: null,
        };
        break;
      case "selectedAnswer":
        tempQuestionObj.conditions[condIndex].selectedAnswer = val;
        tempQuestionObj.conditions[condIndex].action = {
          label: null,
          value: null,
        };
        tempQuestionObj.conditions[condIndex].nextQuestion = {
          label: null,
          value: null,
        };
        break;
      case "action":
        tempQuestionObj.conditions[condIndex].action = val;
        tempQuestionObj.conditions[condIndex].nextQuestion = {
          label: null,
          value: null,
        };
        break;
      case "question":
        tempQuestionObj.conditions[condIndex].nextQuestion = val;
        break;
      default:
        return;
    }
    console.log(tempQuestionObj);
    setQuestionObj({ ...tempQuestionObj });
  };

  const renderConditions = () => {
    return questionObj?.conditions.map((cond, index) => {
      return (
        <div key={`logic-condition-${index}`}>
          {questionObj?.conditioningType?.value === "if" && (
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
          {questionObj?.conditions.length > 1 && (
            <p onClick={(e) => deleteCondition(e, index)}>delte condition</p>
          )}
        </div>
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit", questionObj);
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
      questionId: questionObj?.id,
      ...questionObj,
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
    let tempQuestionObj = JSON.parse(JSON.stringify(questionObj));
    tempQuestionObj.conditioningType = {
      label: null,
      value: null,
    };
    tempQuestionObj.conditions = [
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
    console.log(tempQuestionObj);
    setQuestionObj({ ...tempQuestionObj });
  };

  const handlePopOverModalState = (e) => {
    setPopOverState(!popOverState);
  };

  const renderPopOverContent = () => (
    <form onSubmit={(e) => handleSubmit(e, "logicForm")}>
      {/* Conditioning type [if || always] */}
      <SelectMenu
        options={conditioningTypesOptions}
        defaultValue={questionObj?.conditioningType}
        value={questionObj?.conditioningType}
        handleOptionChange={(e) => handleOptionChange(e, "conditioningType")}
      />
      {/* Render logic conditions */}
      <div className="d-flex">
        {questionObj && <div>{renderConditions()}</div>}
        {questionObj?.conditioningType?.value === "if" && (
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
        {questionBasicInfoObj?.title && (
          <p onClick={(e) => handlePopOverModalState(e)}>logic</p>
        )}
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
