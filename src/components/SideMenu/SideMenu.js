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
      content: <p>test survey</p>,
    },
    {
      id: 2,
      title: "Welcome page",
      icon: "test",
      content: <p>test survey 1</p>,
    },
    {
      id: 3,
      title: "Exit page",
      icon: "test",
      content: <p>test survey 2</p>,
    },
    {
      id: 4,
      title: "Logout",
      icon: "test",
      content: <p>test survey 43</p>,
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
