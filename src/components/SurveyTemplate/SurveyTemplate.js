import React, { useState } from "react";
import HorizontalTabs from "../HorizontalTabs/HorizontalTabs";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import RadioQuestionTemplate from "../RadioQuestionTemplate/RadioQuestionTemplate";
import TemplateQuestions from './TemplateQuestions/TemplateQuestions';
import TemplateBranchingFlow from './TemplateBranchingFlow/TemplateBranchingFlow'

const SurveyTemplate = () => {
  const [templateQuestionsList, setTemplateQuestionsList] = useState([]);
  const [currentTab, setCurrentTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

//   generate random number to generate id for both [question and answer]
  const generateRandomNum = (num) => {
    return `${Math.random().toFixed(num).split(".")[1]}`;
  };

  /************** generate new id [ generatorType => question or answer ] ***************/
  const generateNewID = (generatorType) => {
    return `${generatorType}-${generateRandomNum(5)}-${generateRandomNum(
      5
    )}-${generateRandomNum(5)}`;
  };

  /******************************* geerate new question object ****************************/
  const generateNewQuestionObj = (questionType) => {
    switch (questionType) {
      case "dropDown":
      case "multiSelect":
      case "radio":
        return {
          questionContent: "",
          id: generateNewID("question"),
          questionType,
          answers: [
            {
              id: generateNewID("answer"),
              content: "Yes",
            },
            {
              id: generateNewID("answer"),
              content: "No",
            },
          ],
        };

      default:
        return;
    }
  };

  /********************* adding new question to template questions list *****************/
  const addQuestion = (e, questionType) => {
    let questionTemplate = generateNewQuestionObj(questionType);
    // if its the first question to be added
    // to know the survey start point
    questionTemplate.isStart = templateQuestionsList.length === 0;
    setTemplateQuestionsList([...templateQuestionsList, questionTemplate]);
  };

  /***************************** handle question text change ****************************/
  const handleQuestionChange = (e, questionIndex) => {
    let tempQuestionsList = JSON.parse(JSON.stringify(templateQuestionsList));
    tempQuestionsList[questionIndex].questionContent = e.target.value;
    setTemplateQuestionsList([...tempQuestionsList]);
  };

  /****************************** handle answer text change *****************************/
  const handleAnswerChange = (e, questionIndex, answerIndex, questionType) => {
    switch (questionType) {
      case "radio":
      case "dropDown":
      case "multiSelect":
        let tempQuestionsList = JSON.parse(
          JSON.stringify(templateQuestionsList)
        );
        tempQuestionsList[questionIndex].answers[answerIndex].content =
          e.target.value;
        setTemplateQuestionsList([...tempQuestionsList]);
        break;

      default:
        return;
    }
  };

  /************************************ add new answer *********************************/
  // only for drop down, radio, multi select questions
  const handleAddNewAnswer = (e, questionIndex) => {
    let tempQuestionsList = JSON.parse(JSON.stringify(templateQuestionsList));
    tempQuestionsList[questionIndex].answers.push({
      content: "",
      id: generateNewID("answer"),
    });
    setTemplateQuestionsList([...tempQuestionsList]);
  };

  /********************************** delete answer **********************/
  // only for drop down, radio, multi select questions
  const handleDeleteAnswer = (e, questionIndex, answerIndex) => {
    let tempQuestionsList = JSON.parse(JSON.stringify(templateQuestionsList));
    tempQuestionsList[questionIndex].answers.splice(answerIndex, 1);
    setTemplateQuestionsList([...tempQuestionsList]);
  };

  const getQuestionComponnet = (ques, questionIndex) => {
    switch (ques.questionType) {
      case "dropDown":
        return <p key={`question-${questionIndex}`}>drop down</p>;
      case "multiSelect":
        return <p key={`question-${questionIndex}`}>multi</p>;
      case "radio":
        return (
          <div key={`question-${questionIndex}`}>
            <RadioQuestionTemplate
              questionTemplate={ques}
              questionIndex={questionIndex}
              handleAnswerChange={handleAnswerChange}
              handleAddNewAnswer={handleAddNewAnswer}
              handleDeleteAnswer={handleDeleteAnswer}
              handleQuestionChange={(e) =>
                handleQuestionChange(e, questionIndex)
              }
            />
          </div>
        );

      default:
        return;
    }
  };

  const TemplateOptions = [
    {
      id: 0,
      title: "questions list",
      icon: <FavoriteIcon />,
      content: (
        <TemplateQuestions
          templateQuestionsList={templateQuestionsList}
          getQuestionComponnet={getQuestionComponnet}
        />
      ),
    },
    {
      id: 1,
      title: "branching/logic",
      icon: <PersonPinIcon />,
      content: <TemplateBranchingFlow />,
    },
  ];

  return (
    <>
      <HorizontalTabs
        tabsList={TemplateOptions}
        handleTabChange={handleTabChange}
        currentTab={currentTab}
        withIcons={true}
      />
      {/************************* render question types ***************/}
      {/* list of questions ltypes should be moved to separet compo */}
      <div onClick={(e) => addQuestion(e, "dropDown")}>
        <p>drop down</p>
      </div>
      <div onClick={(e) => addQuestion(e, "multiSelect")}>
        <p>multiSelect</p>
      </div>
      <div onClick={(e) => addQuestion(e, "radio")}>
        <p>radio button [yes/no]</p>
      </div>
    </>
  );
};

export default SurveyTemplate;
