import { useParams } from "react-router-dom";

const Home = () => {
  const { templateId } = useParams();
  console.log(templateId);
  return <section>{<p>no template</p>}</section>;
};

export default Home;
