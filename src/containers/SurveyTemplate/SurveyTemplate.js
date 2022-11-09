import React, { useState } from "react";
import HorizontalTabs from "../../components/HorizontalTabs/HorizontalTabs";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
// import AddEditQuestionsList from "../../components/";
import BranchingFlowTab from "./BranchingFlowTab/BranchingFlowTab";
import QuestionsListTab from "./QuestionsListTab/QuestionsListTab";
import { Link, useParams } from "react-router-dom";

const SurveyTemplate = () => {
  const { type, templateId, questionId } = useParams();
  const [currentTab, setCurrentTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  // dummy questions list
  const dummuyQuestinsList = [
    {
      id: 1,
      content: "q 1",
      type: 1,
    },
    {
      id: 2,
      content: "q 2",
      type: 2,
    },
    {
      id: 3,
      content: "q 3",
      type: 1,
    },
    {
      id: 4,
      content: "q 4",
      type: 2,
    },
    {
      id: 5,
      content: "q 5",
      type: 2,
    },
  ];

  // questions list & branching tabs
  const TemplateOptions = [
    {
      id: 0,
      title: "questions list",
      icon: <FavoriteIcon />,
      content: <QuestionsListTab questionsList={dummuyQuestinsList} />,
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
          tabsList={TemplateOptions}
          handleTabChange={handleTabChange}
          currentTab={currentTab}
          withIcons={true}
        />
      }
    </>
  );
};

export default SurveyTemplate;
