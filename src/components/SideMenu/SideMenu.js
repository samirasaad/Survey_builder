import React from "react";
import SurveyTemplate from "../SurveyTemplate/SurveyTemplate";
import VerticalTabs from "../VerticalTabs/VerticalTabs";

const SideMenu = () => {
  // const [currentTab, setCurrentTab] = React.useState(
  //   +window.location.href.split("?")[1] || 0
  // );

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

  const [currentTab, setCurrentTab] = React.useState(
    0
    // sideMenuOptions.find(opt=>opt.id === (+window.location.href.split("?")[1] || 0)).id
  );
  // console.log( sideMenuOptions.find(opt=>opt.id === (+window.location.href.split("?")[1] || 0)).id)

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);

    //
    // history.push(?sideMenuOptions.find(i=>i.id === currentTab).title))
    // new URLSearchParams(sideMenuOptions.find(i=>i.id === currentTab).title)
  };

  return (
    <VerticalTabs
      tabPanelClasses="w-100"
      tabsList={sideMenuOptions}
      currentTab={currentTab}
      handleTabChange={handleTabChange}
    />
  );
};

export default SideMenu;
