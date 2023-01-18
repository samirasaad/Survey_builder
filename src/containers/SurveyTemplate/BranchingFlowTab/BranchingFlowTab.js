import { useState, useCallback, useEffect, useRef } from "react";
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "reactflow";
import { collection, getDocs, query, where } from "firebase/firestore";
import CustomNode from "./CustomNode/CustomNode";
import "reactflow/dist/style.css";
import "./BranchingFlowTab.css";
import { DB } from "./../../../firebase";
import { BASIC_INFO, LOGIC } from "./../../../utils/constants";
import Btn from "../../../controls/Btn/Btn";

// const defaultEdgeOptions = {
//   style: { strokeWidth: 2, stroke: "#09c809" },
//   type: "floating",
//   markerEnd: {
//     type: MarkerType.ArrowClosed,
//     color: "#09c809",
//   },
// };

const nodeTypes = {
  customNode: CustomNode,
};

// const initialNodes = [
//   {
//     id: "1",
//     data: { label: "1" },
//     deletable: false,
//     position: { x: 0, y: 0 },
//     type: "input", //edge go away of it not to it [act as parent]
//     className: "flow-node",
//   },
//   {
//     id: "2",
//     data: { label: "2" },
//     deletable: false,
//     position: { x: 100, y: 100 },
//     type: "output", //edge went to it not from it [ its a child]
//   },
//   {
//     id: "3",
//     data: { label: "3" },
//     deletable: false,
//     position: { x: 200, y: 200 },
//     type: "default", //has ingoing outgoing and
//   },
//   {
//     id: "4",
//     data: { label: "4" },
//     deletable: false,
//     position: { x: 400, y: 400 },
//     type: "customNode",
//   },
// ];

// const initialEdges = [
//   //   { id: "1-3", source: "1", target: "3", label: "to the", type: "step" },
//   {
//     id: "edges-e5-6",
//     deletable: false,
//     source: "1",
//     target: "3",
//     label: "styled label",
//     labelStyle: { fill: "blue", fontWeight: 700 },
//     markerEnd: {
//       type: MarkerType.Arrow,
//     },
//   },
//   {
//     id: "edges-e5-7",
//     deletable: false,
//     source: "1",
//     target: "2",
//     label: (
//       <button onClick={(e) => console.log(e)}>'label with styled bg'</button>
//     ),
//     labelBgPadding: [8, 4],
//     labelBgBorderRadius: 4,
//     labelBgStyle: { fill: "#FFCC00", color: "#fff", fillOpacity: 0.7 },
//     animated: true,
//     markerEnd: {
//       type: MarkerType.ArrowClosed,
//     },
//   },
//   {
//     id: "edges",
//     deletable: false,
//     source: "1",
//     target: "4",
//     label: "label with styled bg",
//     labelBgPadding: [8, 4],
//     labelBgBorderRadius: 4,
//     labelBgStyle: { fill: "#FFCC00", color: "#fff", fillOpacity: 0.7 },
//     animated: true,
//     markerEnd: {
//       type: MarkerType.ArrowClosed,
//       width: 20,
//       height: 20,
//       color: "#FF0072",
//     },
//   },

//   //   { id: "1-2", source: "1", target: "2",  type: "step" , animated: true,
//   //   label: 'animated styled edge', labelStyle: { fill: 'red', fontWeight: 700 },
//   //   markerEnd: {
//   //     type: MarkerType.Arrow,
//   //   },},
// ];

const BranchingFlowTab = () => {
  // const [nodes, setNodes] = useState(initialNodes);
  // const [edges, setEdges] = useState(initialEdges);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [questionsListBasicInfo, setQuestionsListBasicInfo] = useState(null);
  const [questionsListLogic, setQuestionsListLogic] = useState(null);
  let currentYPosition = useRef(0); //0 is intail value
  let currentXPosition = useRef(0); //0 is intail value

  let positionX = 0;
  let positionY = 0;

  const snapGrid = [20, 20];

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getQuestionsListBasicInfo();
      // getQuestionsBasicInfo();
      getQuestionsLogic();
    }
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (questionsListBasicInfo && questionsListLogic) {
      convertQuestionsToNodes();
    }
    if (questionsListLogic) {
      prepareEdges();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionsListBasicInfo, questionsListLogic]);

  // prepare nodes
  const convertQuestionsToNodes = () => {
    // array holds conditions arrays from all questions => array of objects for conditions
    let tempArr = questionsListLogic.map((q) => q.conditions).flat(1);
    // getting number of how many times a question used as nextQuestion
    // to calculate number of target handlers
    let numOfTargetHandlers = questionsListLogic.map((q) =>
      tempArr.filter((c) => c.nextQuestion.value === q.questionId)
    );
    let nodesList = questionsListBasicInfo.map((q, index) => {
      return {
        id: q.questionId, //same id in edge object for key source

        // extent: 'parent',

        // data is an object holds all info we need to render in node container
        // we can name objcet keys whtaever we want and use same keys in custom node file
        data: {
          label: q.title,
          isStart: q.isStart,
          sourceHandlersNum: questionsListLogic[index]?.conditions?.length,
          targetHandlersNum: numOfTargetHandlers[index]?.length,
          // targetHandeID: q.questionId,
          renderNodeContent: () => renderNodeContent(q),
        },
        deletable: false,
        type: "customNode",
        isConnectable: false,
        position: q.isStart
          ? { x: 0, y: 0 }
          : {
              x: positionX + (200 * index + 1),
              y: 0,
            },
      };
    });

    setNodes([...nodesList]);
  };

  // prepare edges
  const prepareEdges = () => {
    let edgesList = questionsListLogic.map((q, qIndex) => {
      return q.conditions.map((cond, condIndex) => ({
        id: q.questionId,
        // data: {
        //   sourcePosition:
        //     `${questionsListLogic[qIndex + 1]}`.questionId ===
        //     cond.nextQuestion? 'left' :'bottom'
        // },
        deletable: false,
        source: q.questionId, //source id [source node] same id in node object for key id
        target: cond.nextQuestion?.value, // target id [end node id] [id of a node to go for it]
        sourceHandle: `source-handle-${condIndex}`, //same id as <Handle>  with type source takes in custom nodes
        targetHandle: `target-handle-${condIndex}`, //same id as <Handle>  with type target takes in custom nodes
        label: "",
        labelBgPadding: [8, 4],
        labelBgBorderRadius: 4,
        labelBgStyle: { fill: "#FFCC00", color: "#fff", fillOpacity: 0.7 },
        animated: false,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: "#FF0072",
        },
      }));
    });
    // to merge array of arrays retrievd from previous process
    setEdges([...edgesList.flat(1)]);
  };

  /******************** get list of questions => basicinfo only *************/
  const getQuestionsBasicInfo = async () => {
    // get list once [no real time updates subscription]
    // let tempList = JSON.parse(JSON.stringify(questionsListBasicInfo)) || [];
    // const querySnapshot = await getDocs(collection(DB, BASIC_INFO));
    // querySnapshot.forEach((doc) => {
    //   tempList = [...tempList, doc.data()];
    //   setQuestionsListBasicInfo([...tempList]);
    // });
  };

  /********************************** get list of questions [basic info] *****************************/
  const getQuestionsListBasicInfo = async () => {
    // get list once [no real time updates subscription]
    let tempQuestionsList = [];
    const q = query(
      collection(DB, BASIC_INFO),
      where("templateId", "==", localStorage.getItem("templateId"))
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      /* sort questions list ascending according to its timestamp [creation date/time]
         not sorted propely in firestore because firestore sorting docs 
         as per its numerica/alphabetical doc id*/

      // tempQuestionsList = tempQuestionsList.sort(function (x, y) {
      //   return x.timestamp - y.timestamp;
      // });

      tempQuestionsList = [...tempQuestionsList, doc.data()];
      setQuestionsListBasicInfo([...tempQuestionsList]);
    });
  };

  /******************************* get questions logic  **********************************/
  // get list once [no real time updates subscription]
  const getQuestionsLogic = async () => {
    let tempList = JSON.parse(JSON.stringify(questionsListLogic)) || [];
    const querySnapshot = await getDocs(collection(DB, LOGIC));
    querySnapshot.forEach((doc) => {
      tempList = [...tempList, doc.data()];
      setQuestionsListLogic([...tempList]);
    });
  };

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const renderNodeContent = (question) => {
    let tempElem = document.createElement("div");
    tempElem.innerHTML = question.title;
    return (
      <div className="d-flex">
        <p>{tempElem.innerText}</p>
        <Btn content="delete" />
        <Btn content="Plus" />
      </div>
    );
  };

  return (
    <div style={{ height: "900px" }}>
      {/* <img src={endSurvey} id="end" /> */}
      {console.log(nodes)}
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        // defaultEdgeOptions={defaultEdgeOptions}
        nodeTypes={nodeTypes}
        attributionPosition="bottom-left"
        fitView
        snapToGrid={true}
        // snapGrid={snapGrid}
      >
        <Background variant="dots" gap={12} size={1} color={"gray"} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
};

export default BranchingFlowTab;
