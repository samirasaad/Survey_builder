import React from "react";
import TextEditor from "../../components/sharedUi/TextEditor/TextEditor";
import RatingComponent from "../../components/sharedUi/RatingComponent/RatingComponent";

const RatingQuestionTemplate = ({
  questionObj,
  handleQuestionChange,
  handleRatingChange,
  handleIsRatingHasLabels,
  handleRatingLabelChange,
  hasLabels,
}) => {
  return (
    <>
      <TextEditor handleEditorChange={handleQuestionChange} />
      <RatingComponent
        hasLabels={hasLabels}
        questionObj={questionObj}
        readOnly={false}
        handleIsRatingHasLabels={handleIsRatingHasLabels}
        handleRatingChange={handleRatingChange}
      />
      <div className="d-flex">
        <label>Has labels ??</label>
        <input onChange={handleIsRatingHasLabels} type="checkbox" />
      </div>
      <p>
        Hint: has labels when hoovring on each rate point to represent its
        value/measure
      </p>
      {hasLabels &&
        [...new Array(questionObj?.ratingLimit)].map((elm, index) => {
          console.log(elm);
          return (
            <input
              key={`label-${index}`}
              placeholder={questionObj.labels[index + 1].placeholder}
              defaultValue={questionObj.labels[index + 1].val}
              onChange={(e)=>handleRatingLabelChange(e,index)}
            />
          );
        })}
    </>
  );
};

export default RatingQuestionTemplate;
