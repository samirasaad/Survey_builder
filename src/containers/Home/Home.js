import { useEffect } from "react";
import BranchingFlowTab from "../../components/SurveyTemplate/BranchingFlowTab/BranchingFlowTab";
import Btn from "../../controls/Btn/Btn";
import { DB } from "../../firebase";
import { firebaseSignout } from "../../firebase/authMethods";
import Auth from "../../utils/Auth";
import SideMenu from "./../../components/SideMenu/SideMenu";
import { USERS } from "./../../utils/constants";

const Home = () => {
  console.log('cgh')
  return (
    <section>
      <SideMenu />
      {/* <BranchingFlowTab /> */}
    </section>
  );
};

export default Home;
