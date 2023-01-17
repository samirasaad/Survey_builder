// import { useState, useCallback, useEffect, useRef } from "react";
// import ReactFlow, {
//   Controls,
//   Background,
//   applyNodeChanges,
//   applyEdgeChanges,
//   addEdge,
//   useNodesState,
//   useEdgesState,
//   MarkerType,
// } from "reactflow";
// import { collection, getDocs } from "firebase/firestore";
// import CustomNode from "./CustomNode/CustomNode";
// import "reactflow/dist/style.css";
// import "./BranchingFlowTab.css";
// import { DB } from "./../../../firebase";
// import { BASIC_INFO, LOGIC } from "./../../../utils/constants";
// import Btn from "../../../controls/Btn/Btn";

// // const defaultEdgeOptions = {
// //   style: { strokeWidth: 2, stroke: "#09c809" },
// //   type: "floating",
// //   markerEnd: {
// //     type: MarkerType.ArrowClosed,
// //     color: "#09c809",
// //   },
// // };

// const nodeTypes = {
//   customNode: CustomNode,
// };

// // const initialNodes = [
// //   {
// //     id: "1",
// //     data: { label: "1" },
// //     deletable: false,
// //     position: { x: 0, y: 0 },
// //     type: "input", //edge go away of it not to it [act as parent]
// //     className: "flow-node",
// //   },
// //   {
// //     id: "2",
// //     data: { label: "2" },
// //     deletable: false,
// //     position: { x: 100, y: 100 },
// //     type: "output", //edge went to it not from it [ its a child]
// //   },
// //   {
// //     id: "3",
// //     data: { label: "3" },
// //     deletable: false,
// //     position: { x: 200, y: 200 },
// //     type: "default", //has ingoing outgoing and
// //   },
// //   {
// //     id: "4",
// //     data: { label: "4" },
// //     deletable: false,
// //     position: { x: 400, y: 400 },
// //     type: "customNode",
// //   },
// // ];

// // const initialEdges = [
// //   //   { id: "1-3", source: "1", target: "3", label: "to the", type: "step" },
// //   {
// //     id: "edges-e5-6",
// //     deletable: false,
// //     source: "1",
// //     target: "3",
// //     label: "styled label",
// //     labelStyle: { fill: "blue", fontWeight: 700 },
// //     markerEnd: {
// //       type: MarkerType.Arrow,
// //     },
// //   },
// //   {
// //     id: "edges-e5-7",
// //     deletable: false,
// //     source: "1",
// //     target: "2",
// //     label: (
// //       <button onClick={(e) => console.log(e)}>'label with styled bg'</button>
// //     ),
// //     labelBgPadding: [8, 4],
// //     labelBgBorderRadius: 4,
// //     labelBgStyle: { fill: "#FFCC00", color: "#fff", fillOpacity: 0.7 },
// //     animated: true,
// //     markerEnd: {
// //       type: MarkerType.ArrowClosed,
// //     },
// //   },
// //   {
// //     id: "edges",
// //     deletable: false,
// //     source: "1",
// //     target: "4",
// //     label: "label with styled bg",
// //     labelBgPadding: [8, 4],
// //     labelBgBorderRadius: 4,
// //     labelBgStyle: { fill: "#FFCC00", color: "#fff", fillOpacity: 0.7 },
// //     animated: true,
// //     markerEnd: {
// //       type: MarkerType.ArrowClosed,
// //       width: 20,
// //       height: 20,
// //       color: "#FF0072",
// //     },
// //   },

// //   //   { id: "1-2", source: "1", target: "2",  type: "step" , animated: true,
// //   //   label: 'animated styled edge', labelStyle: { fill: 'red', fontWeight: 700 },
// //   //   markerEnd: {
// //   //     type: MarkerType.Arrow,
// //   //   },},
// // ];

// const BranchingFlowTab = () => {
//   // const [nodes, setNodes] = useState(initialNodes);
//   // const [edges, setEdges] = useState(initialEdges);
//   const [nodes, setNodes] = useState([]);
//   const [edges, setEdges] = useState([]);
//   const [questionsListBasicInfo, setQuestionsListBasicInfo] = useState(null);
//   const [questionsListLogic, setQuestionsListLogic] = useState(null);
//   let currentYPosition = useRef(0); //0 is intail value
//   let currentXPosition = useRef(0); //0 is intail value

//   let positionX = 0;
//   let positionY = 0;

//   useEffect(() => {
//     let mounted = true;
//     if (mounted) {
//       getQuestionsBasicInfo();
//       getQuestionsLogic();
//     }
//     return () => {
//       mounted = false;
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     if (questionsListBasicInfo) {
//       convertQuestionsToNodes();
//     }
//     if (questionsListLogic) {
//       prepareEdges();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [questionsListBasicInfo, questionsListLogic]);

//   // prepare nodes
//   const convertQuestionsToNodes = () => {
//     let nodesList = questionsListBasicInfo.map((q, index) => {
//       return {
//         id: q.questionId,
//         // data is an object holds all info we need to render in node container
//         // we can name objcet keys whtaever we want and use same keys in custom node file
//         data: {
//           label: q.title,
//           isStart: q.isStart,

//           renderNodeContent: () => renderNodeContent(q),
//         },
//         deletable: false,
//         sourcePosition: "right",
//         targetPosition: "left",

//         type: "customNode",
//         isConnectable: false,
//         position: q.isStart
//           ? { x: 0, y: 0 }
//           : {
//               x: positionX + (200 * index + 1),
//               y: 0,
//             },
//       };
//     });

//     setNodes([...nodesList]);
//   };

//   // prepare edges
//   const prepareEdges = () => {
//     let edgesList = questionsListLogic.map((q, qIndex) => {
//       return q.conditions.map((cond, condIndex) => ({
//         id: q.questionId,
//         // data: {
//         //   sourcePosition:
//         //     `${questionsListLogic[qIndex + 1]}`.questionId ===
//         //     cond.nextQuestion? 'left' :'bottom'
//         // },
//         deletable: false,
//         source: q.questionId, //source id
//         target: cond.nextQuestion?.value, // target id
//         label: "",
//         labelBgPadding: [8, 4],
//         labelBgBorderRadius: 4,
//         labelBgStyle: { fill: "#FFCC00", color: "#fff", fillOpacity: 0.7 },
//         animated: false,
//         markerEnd: {
//           type: MarkerType.ArrowClosed,
//           width: 20,
//           height: 20,
//           color: "#FF0072",
//         },
//       }));
//     });
//     // to merge array of arrays retrievd from previous process
//     setEdges([...edgesList.flat(1)]);
//   };

//   /******************** get list of questions => basicinfo only *************/
//   const getQuestionsBasicInfo = async () => {
//     // get list once [no real time updates subscription]
//     let tempList = JSON.parse(JSON.stringify(questionsListBasicInfo)) || [];
//     const querySnapshot = await getDocs(collection(DB, BASIC_INFO));
//     querySnapshot.forEach((doc) => {
//       // doc.data() is never undefined for query doc snapshots
//       tempList = [...tempList, doc.data()];
//       setQuestionsListBasicInfo([...tempList]);
//     });
//     /********************* subscriping for real updates [for specific doc] ***************/
//     // onSnapshot(
//     //   doc(
//     //     DB,
//     //     BASIC_INFO,
//     //     "oP7uNHa5TfU04RMiCUQjZAF9b9r1-59066-57832-46135-81598-question-80677-07848-33078"
//     //   ),
//     //   (doc) => {
//     //     console.log("Current data: ", doc.data());
//     //   }
//     // );
//   };

//   /******************************* get questions logic  **********************************/
//   const getQuestionsLogic = async () => {
//     // get list once [no real time updates subscription]
//     let tempList = JSON.parse(JSON.stringify(questionsListLogic)) || [];
//     const querySnapshot = await getDocs(collection(DB, LOGIC));
//     querySnapshot.forEach((doc) => {
//       // doc.data() is never undefined for query doc snapshots
//       tempList = [...tempList, doc.data()];
//       setQuestionsListLogic([...tempList]);
//     });
//   };

//   const onNodesChange = useCallback(
//     (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
//     []
//   );

//   const onEdgesChange = useCallback(
//     (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
//     []
//   );

//   const renderNodeContent = (question) => {
//     let tempElem = document.createElement("div");
//     tempElem.innerHTML = question.title;
//     return (
//       <div className="d-flex">
//         <p>{tempElem.innerText}</p>
//         <Btn content="delete" />
//         <Btn content="Plus" />
//       </div>
//     );
//   };

//   return (
//     <div style={{ height: "900px" }}>
//       {/* <img src={endSurvey} id="end" /> */}
//       <ReactFlow
//         nodes={nodes}
//         onNodesChange={onNodesChange}
//         edges={edges}
//         onEdgesChange={onEdgesChange}
//         // defaultEdgeOptions={defaultEdgeOptions}
//         nodeTypes={nodeTypes}
//         attributionPosition="bottom-left"
//         fitView
//       >
//         <Background variant="dots" gap={12} size={1} color={"gray"} />
//         <Controls showInteractive={false} />
//       </ReactFlow>
//     </div>
//   );
// };

// export default BranchingFlowTab;

import React, { useCallback } from "react";
import ReactFlow, {
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

import FloatingEdge from "./BranchingFlowCopy/FloatingEdge";
import FloatingConnectionLine from "./BranchingFlowCopy/FloatingConnectionLine.js";
import { createNodesAndEdges } from "./BranchingFlowCopy/utils.js";

const { nodes: initialNodes, edges: initialEdges } = createNodesAndEdges();

const edgeTypes = {
  floating: FloatingEdge,
};

const NodeAsHandleFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "floating",
            markerEnd: { type: MarkerType.Arrow },
          },
          eds
        )
      ),
    [setEdges]
  );

  return (
    <div className="floatingedges" style={{ height: "900px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        edgeTypes={edgeTypes}
        connectionLineComponent={FloatingConnectionLine}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default NodeAsHandleFlow;
