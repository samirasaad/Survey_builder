import { useNavigate, useParams } from "react-router-dom";
import { DB } from "../../firebase";
import Btn from "../../controls/Btn/Btn";
import SelectMenu from "../../controls/SelectMenu/SelectMenu";
import PopoverComponent from "../../components/sharedUi/PopOver/PopOver";
import { useEffect, useState } from "react";
import { setDoc, doc, getDoc, updateDoc, collection } from "firebase/firestore";

import { BASIC_INFO, LOGIC } from "./../../utils/constants";

const QuestionLogicForm = () => {
  const navigate = useNavigate();
  const [popOverState, setPopOverState] = useState(false);
  const { questionId, templateId } = useParams();
  const [questionObj, setQuestionObj] = useState(null);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getQuestionLogic();
    }
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // action
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

  const ratingvaluesOptions = [
    {
      value: "1",
      label: "1",
    },
    {
      value: "2",
      label: "2",
    },
    {
      value: "3",
      label: "3",
    },
  ];

  // condition statment
  const getEquailtyOptions = () => {
    switch (questionObj?.questionType) {
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
        nextQuestion: null,
        selectedAnswer: {
          value: "",
          label: "",
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
    switch (optionType) {
      case "conditioningType":
        tempQuestionObj.conditioningType = val;
        tempQuestionObj.conditions[condIndex].condition = null;
        tempQuestionObj.conditions[condIndex].selectedAnswer = null;
        tempQuestionObj.conditions[condIndex].action = null;
        tempQuestionObj.conditions[condIndex].nextQuestion = null;
        break;
      case "condition":
        tempQuestionObj.conditions[condIndex].condition = val;
        tempQuestionObj.conditions[condIndex].selectedAnswer = val;
        tempQuestionObj.conditions[condIndex].action = val;
        tempQuestionObj.conditions[condIndex].nextQuestion = val;
        break;
      case "selectedAnswer":
        tempQuestionObj.conditions[condIndex].selectedAnswer = val;
        tempQuestionObj.conditions[condIndex].action = val;
        tempQuestionObj.conditions[condIndex].nextQuestion = val;
        break;
      case "action":
        tempQuestionObj.conditions[condIndex].action = val;
        tempQuestionObj.conditions[condIndex].nextQuestion = null;
        break;
      case "question":
        tempQuestionObj.conditions[condIndex].nextQuestion = val;
        break;
      default:
        return;
    }
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
                  options={ratingvaluesOptions}
                  defaultValue={cond.selectedAnswer}
                  value={cond.selectedAnswer}
                  handleOptionChange={(e) =>
                    handleOptionChange(e, "selectedAnswer", index)
                  }
                />
              </div>
            </div>
          )}
          {/* Applied action  */}
          <p>Apply these action</p>
          <SelectMenu
            options={appliedActionsOptions}
            defaultValue={cond.action}
            value={cond.action}
            handleOptionChange={(e) => handleOptionChange(e, "action", index)}
          />
          {/* questions list */}
          {(cond.action?.value === "goTo" || cond.action?.value === "skip") && (
            <SelectMenu
              options={appliedActionsOptions}
              defaultValue={cond.action}
              value={cond.action}
              handleOptionChange={(e) =>
                handleOptionChange(e, "question", index)
              }
            />
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
    // get doc ref
    let templateQuestionsRef = doc(
      DB,
      LOGIC,
      `${localStorage.getItem("uid")}-${templateId}-${questionObj?.id}`
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
    tempQuestionObj.conditioningType = null;
    tempQuestionObj.conditions = [
      {
        condition: null,
        action: null,
        nextQuestion: null,
        selectedAnswer: null,
      },
    ];
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
    </>
  );
};

export default QuestionLogicForm;
