import { useState } from "react";
import BranchingFlow from "../../components/Branching/Branching";
import Template from "../../components/Template/Template";
import RadioQuestionTemplate from "./../../components/RadioQuestionTemplate/RadioQuestionTemplate";

const Home = () => {
  const [templateQuestionsList, setTemplateQuestionsList] = useState([]);

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

  //   const renderTemplate = () => {
  //     return templateQuestionsList.map((ques, questionIndex) => {
  //       return getQuestionComponnet(ques, questionIndex);
  //     });
  //   };

  return (
    <section className="create-template-container">
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

      {/************************* render template  ***************/}
      <Template
        templateQuestionsList={templateQuestionsList}
        getQuestionComponnet={getQuestionComponnet}
      />
      <BranchingFlow />
    </section>
  );
};

export default Home;
