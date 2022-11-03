import { useEffect } from "react";
import BranchingFlowTab from "../../components/SurveyTemplate/BranchingFlowTab/BranchingFlowTab";
import Btn from "../../controls/Btn/Btn";
import { DB } from "../../firebase";
import { firebaseSignout } from "../../firebase/authMethods";
import Auth from "../../utils/Auth";
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


  const handleLogout =() =>{
    firebaseSignout()
    Auth.signOut()
  }

  return (
    <section>
      <Btn content='logout' handleClick={handleLogout}/>
      <SideMenu />
      {/* <BranchingFlowTab /> */}
    </section>
  );
};

export default Home;
