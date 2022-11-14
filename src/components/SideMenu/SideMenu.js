import React from "react";
import PreviewTemplate from "../../containers/PreviewTemplate/PreviewTemplate";
import SurveyTemplate from "../../containers/SurveyTemplate/SurveyTemplate";
import { useNavigate } from "react-router-dom";
import NoSurveyTemplateFound from "../../containers/NoSurveyTemplateFound/NoSurveyTemplateFound";

const SideMenu = () => {
  const navigate = useNavigate();
  const templateId = localStorage.getItem("templateId");
  const sideMenuOptions = [
    {
      id: 0,
      title: "survey emplate",
      icon: "test",
      content: templateId ? <SurveyTemplate /> : <NoSurveyTemplateFound />,
      redirectionUrl: templateId ? `/template/${templateId}` : "/",
    },
    {
      id: 1,
      title: "preview",
      icon: "test",
      content: <PreviewTemplate />,
      redirectionUrl: templateId ? `/preview/${templateId}` : "/preview",
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
    <div key={opt.id} onClick={(e) => handelRouting(e, opt.redirectionUrl)}>{opt.title}</div>
  ));
};

export default SideMenu;
