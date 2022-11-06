import { useParams } from "react-router-dom";

const PreviewTemplate = () => {
  const { templateId } = useParams();
  return templateId ? (
    <p>preview questions stepper</p>
  ) : (
    <p>start craeting a survey template</p>
  );
};

export default PreviewTemplate;
