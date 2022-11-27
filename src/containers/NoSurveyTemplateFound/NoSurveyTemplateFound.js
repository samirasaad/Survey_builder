import { Link } from "react-router-dom";
import { generateNewID } from "../../utils/shared";

const Home = () => {
  return (
    <section>
      {
        <>
          <p>no template, Start building your survey</p>
          <Link to={`/question/${generateNewID()}`}>+</Link>
        </>
      }
    </section>
  );
};

export default Home;
