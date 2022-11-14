import React from "react";
import TextEditor from "../../components/sharedUi/TextEditor/TextEditor";
import RatingComponent from "../../components/sharedUi/RatingComponent/RatingComponent";

const RatingQuestionTemplate = ({ questionObj, handleQuestionChange }) => {
  return (
    <>
      <TextEditor handleEditorChange={handleQuestionChange} />
      <RatingComponent
        ratingLimit={questionObj?.ratingLimit}
        ratingIcon={questionObj?.ratingIcon}
        readOnly={false}
      />
    </>
  );
};

export default RatingQuestionTemplate;
