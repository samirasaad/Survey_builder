import { useEffect } from "react";
import BranchingFlowTab from "../../components/SurveyTemplate/BranchingFlowTab/BranchingFlowTab";
import { DB } from "../../firebase";
import SideMenu from "./../../components/SideMenu/SideMenu";
import { USERS } from "./../../utils/constants";

const Home = () => {
  useEffect(() => {
    DB.collection(USERS)
      .where("id", "==", localStorage.getItem("uid"))
      .get()
      .then((querySnapshot) => {
        let usersList = querySnapshot.docs.map((doc) => {
          console.log(doc.data());
          return doc.data();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section>
      <SideMenu />
      {/* <BranchingFlowTab /> */}
    </section>
  );
};

export default Home;
