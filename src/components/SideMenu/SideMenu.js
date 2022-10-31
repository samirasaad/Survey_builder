import React from "react";
import SurveyTemplate from "../SurveyTemplate/SurveyTemplate";
import VerticalTabs from "../VerticalTabs/VerticalTabs";

const SideMenu = () => {
  const [currentTab, setCurrentTab] = React.useState(0);

  const sideMenuOptions = [
    {
      id: 0,
      title: "survey emplate",
      icon: "test",
      content: <SurveyTemplate />,
    },
    {
      id: 1,
      title: "Logout",
      icon: "test",
      content: <div>test survey</div>,
    },
    {
      id: 2,
      title: "Welcome page",
      icon: "test",
      content: <div>test survey 1</div>,
    },
    {
      id: 3,
      title: "Exit page",
      icon: "test",
      content: <div>test survey 2</div>,
    },
    {
      id: 4,
      title: "Logout",
      icon: "test",
      content: <div>test survey 43</div>,
    },
  ];

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <div>
      <VerticalTabs
        tabsList={sideMenuOptions}
        value={currentTab}
        handleTabChange={handleTabChange}
      />
    </div>
  );
};

export default SideMenu;
