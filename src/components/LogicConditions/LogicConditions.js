import React, { useEffect, useState } from "react";
import Btn from "../../controls/Btn/Btn";
import SelectMenu from "../../controls/SelectMenu/SelectMenu";

const LogicConditions = ({ questionObj, setQuestionObj }) => {
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

  const getEquailtyOptions = () => {
    switch (questionObj.questionType) {
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

  const addNewCondition = () => {
    let tempQuestionObj = JSON.parse(JSON.stringify(questionObj));
    tempQuestionObj.logic.conditions = [
      ...tempQuestionObj.logic.conditions,
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
    tempQuestionObj.logic.conditions.splice(condIndex, 1);
    setQuestionObj({ ...tempQuestionObj });
  };

  const handleOptionChange = (val, optionType, condIndex = 0) => {
    let tempQuestionObj = JSON.parse(JSON.stringify(questionObj));
    switch (optionType) {
      case "conditioningType":
        tempQuestionObj.logic.conditioningType = val;
        tempQuestionObj.logic.conditions[condIndex].condition = null;
        tempQuestionObj.logic.conditions[condIndex].selectedAnswer = null;
        tempQuestionObj.logic.conditions[condIndex].action = null;
        tempQuestionObj.logic.conditions[condIndex].nextQuestion = null;
        break;
      case "condition":
        tempQuestionObj.logic.conditions[condIndex].condition = val;
        tempQuestionObj.logic.conditions[condIndex].selectedAnswer = val;
        tempQuestionObj.logic.conditions[condIndex].action = val;
        tempQuestionObj.logic.conditions[condIndex].nextQuestion = val;
        break;
      case "selectedAnswer":
        tempQuestionObj.logic.conditions[condIndex].selectedAnswer = val;
        tempQuestionObj.logic.conditions[condIndex].action = val;
        tempQuestionObj.logic.conditions[condIndex].nextQuestion = val;
        break;
      case "action":
        tempQuestionObj.logic.conditions[condIndex].action = val;
        tempQuestionObj.logic.conditions[condIndex].nextQuestion = null;
        break;
      case "question":
        tempQuestionObj.logic.conditions[condIndex].nextQuestion = val;
        break;
      default:
        return;
    }
    setQuestionObj({ ...tempQuestionObj });
  };

  const renderConditions = () => {
    return questionObj?.logic.conditions.map((cond, index) => {
      return (
        <div key={`logic-condition-${index}`}>
          {questionObj.logic.conditioningType.value === "if" && (
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
          {questionObj?.logic.conditions.length > 1 && (
            <p onClick={(e) => deleteCondition(e, index)}>delte condition</p>
          )}
        </div>
      );
    });
  };

  const handleSubmit = () => {
    console.log(questionObj);
  };

  const handleCancel = () => {
    console.log(questionObj);
  };

  const handleRemoveAll = () => {
    let tempQuestionObj = JSON.parse(JSON.stringify(questionObj));
    tempQuestionObj.logic.conditioningType = {
      label: "Always", //default
      value: "always",
    };
    tempQuestionObj.logic.conditions = [
      {
        condition: null,
        action: null,
        nextQuestion: null,
        selectedAnswer: null,
      },
    ];
    setQuestionObj({ ...tempQuestionObj });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, "logicForm")}>
      {/* Conditioning type [if|always] */}
      <SelectMenu
        options={conditioningTypesOptions}
        defaultValue={questionObj?.logic?.conditioningType}
        value={questionObj?.logic?.conditioningType}
        handleOptionChange={(e) => handleOptionChange(e, "conditioningType")}
      />
      <div className="d-flex">
        <div>{renderConditions()}</div>
        {questionObj?.logic.conditioningType === "if" && (
          <p onClick={addNewCondition}>add condition</p>
        )}
      </div>
      <div className="logic-actions-btns">
        <Btn content="Save" handleClick={handleSubmit} type="submit" />
        <Btn content="Cancel" handleClick={handleCancel} />
        <Btn content="Remove all" handleClick={handleRemoveAll} />
      </div>
    </form>
  );
};

export default LogicConditions;
