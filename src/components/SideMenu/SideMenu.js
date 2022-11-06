import React from "react";
import PreviewTemplate from "../../containers/PreviewTemplate/PreviewTemplate";
import SurveyTemplate from "../SurveyTemplate/SurveyTemplate";
import { useNavigate } from "react-router-dom";

const SideMenu = () => {
  const navigate = useNavigate();

  const sideMenuOptions = [
    {
      id: 0,
      title: "survey emplate",
      icon: "test",
      content: <SurveyTemplate />,
      redirectionUrl: localStorage.getItem("templateId")
        ? `/template/${localStorage.getItem("templateId")}`
        : "/",
    },
    {
      id: 1,
      title: "preview",
      icon: "test",
      content: <PreviewTemplate />,
      redirectionUrl: localStorage.getItem("templateId")
        ? `/preview/${localStorage.getItem("templateId")}`
        : "/preview",
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
  ];

  const handelRouting = (e, redirectURL) => {
    navigate(redirectURL);
  };

  return sideMenuOptions.map((opt) => (
    <div onClick={(e) => handelRouting(e, opt.redirectionUrl)}>{opt.title}</div>
  ));
};

export default SideMenu;
