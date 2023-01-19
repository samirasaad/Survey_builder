import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { collection, getDocs } from "firebase/firestore";
import HorizontalTabs from "../../components/HorizontalTabs/HorizontalTabs";
import BranchingFlowTab from "./BranchingFlowTab/BranchingFlowTab";
import QuestionsListTab from "./QuestionsListTab/QuestionsListTab";
import BranchingFlowTabCopy from "./BranchingFlowTab/BranchingFlowTabCopy";


const SurveyTemplate = () => {
  const { templateId } = useParams();
  const [currentTab, setCurrentTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  /***************************** questions list tab & branching tab ***************************/
  const TemplateTabsOptions = [
    {
      id: 0,
      title: "questions list",
      icon: <FavoriteIcon />,
      content: <QuestionsListTab />,
    },
    {
      id: 1,
      title: "branching/logic",
      icon: <PersonPinIcon />,
      // content: <BranchingFlowTab />,
      content: <BranchingFlowTabCopy/>,
      
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
