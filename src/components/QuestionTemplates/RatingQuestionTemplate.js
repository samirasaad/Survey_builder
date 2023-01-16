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
        initialValue={questionObj?.title}
      />
      <RatingComponent
        hasLabels={questionObj?.labels}
        questionObj={questionObj}
        readOnly={false}
        handleIsRatingHasLabels={handleIsRatingHasLabels}
      />
      <div className="d-flex">
        <label>Has labels ??</label>
        <input
          onChange={handleIsRatingHasLabels}
          type="checkbox"
          checked={questionObj?.hasLabels}
        />
      </div>
      <p>
        Hint: has labels when hoovring on each rate point to represent its
        value/measure
      </p>
      {questionObj?.hasLabels &&
        [...new Array(questionObj?.ratingLimit)].map((elm, index) => {
          return (
            <input
              key={`label-${index}`}
              placeholder={questionObj?.labels[index + 1].placeholder}
              defaultValue={questionObj?.labels[index + 1].val}
              onChange={(e) => handleRatingLabelChange(e, index)}
            />
          );
        })}
    </>
  );
};

export default RatingQuestionTemplate;
