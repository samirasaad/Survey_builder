import React from "react";
import SelectMenu from "../../controls/SelectMenu/SelectMenu";

const LogicConditions = () => {
  const conditioningType = [
    {
      value: "if",
      label: "If",
    },
    {
      value: "always",
      label: "Always",
    },
  ];
  const equalityOptions = [
    {
      label: "Equals to",
      value: "Equals to",
    },
    {
      label: "Greater than",
      value: "Greater than",
    },
    {
      label: "Greater than or equals",
      value: "Greater than or equals",
    },
    {
      label: "less than",
      value: "less than",
    },
    {
      label: "less than or equals",
      value: "less than or equals",
    },
  ];

  const appliedActions = [
    {
      value: "Skip",
      label: "Skip",
    },
    {
      value: "Go to",
      label: "Go to",
    },
    {
      value: "End survey",
      label: "End survey",
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


  const addNewCondition =() =>{

  }

  return (
    <section>
        
      <div>
        <SelectMenu options={conditioningType} />
        Response is
        <SelectMenu
          options={equalityOptions}
          //  selectedOption={questionObj}
          hadnleOptionChange
        />
        <SelectMenu options={ratingvaluesOptions} />
      </div>
      <div>
        Apply these conditions <SelectMenu options={appliedActions} />
      </div>
    </section>
  );
};

export default LogicConditions;
