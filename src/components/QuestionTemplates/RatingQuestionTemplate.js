import React from "react";
import TextEditor from "../../components/sharedUi/TextEditor/TextEditor";
import RatingComponent from "../../components/sharedUi/RatingComponent/RatingComponent";

const RatingQuestionTemplate = ({
  questionObj,
  handleQuestionChange,
  handleIsRatingHasLabels,
  handleRatingLabelChange,
}) => {
  return (
    <>
      <TextEditor
        handleEditorChange={handleQuestionChange}
        value={questionObj?.basicInfo?.title}
      />
      <RatingComponent
        hasLabels={questionObj?.basicInfo?.labels}
        questionObj={questionObj}
        readOnly={false}
        handleIsRatingHasLabels={handleIsRatingHasLabels}
      />
      <div className="d-flex">
        <label>Has labels ??</label>
        <input onChange={handleIsRatingHasLabels} type="checkbox" />
      </div>
      <p>
        Hint: has labels when hoovring on each rate point to represent its
        value/measure
      </p>
      {questionObj?.basicInfo?.hasLabels &&
        [...new Array(questionObj?.basicInfo?.ratingLimit)].map(
          (elm, index) => {
            return (
              <input
                key={`label-${index}`}
                placeholder={
                  questionObj?.basicInfo?.labels[index + 1].placeholder
                }
                defaultValue={questionObj?.basicInfo?.labels[index + 1].val}
                onChange={(e) => handleRatingLabelChange(e, index)}
              />
            );
          }
        )}
    </>
  );
};

export default RatingQuestionTemplate;
