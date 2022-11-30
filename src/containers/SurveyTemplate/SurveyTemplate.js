import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { collection, getDocs } from "firebase/firestore";
import HorizontalTabs from "../../components/HorizontalTabs/HorizontalTabs";
import BranchingFlowTab from "./BranchingFlowTab/BranchingFlowTab";
import QuestionsListTab from "./QuestionsListTab/QuestionsListTab";
import { DB } from "./../../firebase";
import { BASIC_INFO } from "./../../utils/constants";

const SurveyTemplate = () => {
  const { templateId } = useParams();
  const [currentTab, setCurrentTab] = React.useState(0);
  const [questionsList, setQuestionsList] = useState(null);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getAllQuestions();
    }
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /******************** get list of questins => basicinfo and question id only  *************/
  const getAllQuestions = async () => {
    // get list once [no real time updates subscription]
    let tempList = JSON.parse(JSON.stringify(questionsList)) || [];
    const querySnapshot = await getDocs(collection(DB, BASIC_INFO));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      tempList = [...tempList, doc.data()];
      setQuestionsList([...tempList]);
    });
    /********************* subscriping for real updates [for specific doc] ***************/
    // onSnapshot(
    //   doc(
    //     DB,
    //     BASIC_INFO,
    //     "oP7uNHa5TfU04RMiCUQjZAF9b9r1-59066-57832-46135-81598-question-80677-07848-33078"
    //   ),
    //   (doc) => {
    //     console.log("Current data: ", doc.data());
    //   }
    // );
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  /***************************** questions list tab & branching tab ***************************/
  const TemplateTabsOptions = [
    {
      id: 0,
      title: "questions list",
      icon: <FavoriteIcon />,
      content: <QuestionsListTab questionsList={questionsList} />,
    },
    {
      id: 1,
      title: "branching/logic",
      icon: <PersonPinIcon />,
      content: <BranchingFlowTab />,
    },
  ];

  return (
    <>
      <Link to={`/question/${templateId}`}>add</Link>
      {
        <HorizontalTabs
          tabsList={TemplateTabsOptions}
          handleTabChange={handleTabChange}
          currentTab={currentTab}
          withIcons={true}
        />
      }
    </>
  );
};

export default SurveyTemplate;
