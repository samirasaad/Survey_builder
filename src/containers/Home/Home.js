import SurveyTemplate from "../../components/SurveyTemplate/SurveyTemplate";
import { useParams } from "react-router-dom";

const Home = () => {
  const { templateId } = useParams();

  return (
    <section>{templateId ? <SurveyTemplate /> : <p>no template</p>}</section>
  );
};

export default Home;
