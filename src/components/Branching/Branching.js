import { useState, useCallback } from "react";
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
import "reactflow/dist/style.css";
import FlowNode from "../FlowNode/FlowNode";
import  endSurvey from './../../assets/images/end-survey.png';
import "./BranchingFlow.css";

const defaultEdgeOptions = {
  style: { strokeWidth: 2, stroke: "#09c809" },
  type: "floating",
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "#09c809",
  },
};

const nodeTypes = {
  flowNode: FlowNode,
};

const initialNodes = [
  {
    id: "1",
    data: { label: "1" },
    deletable:false,
    position: { x: 0, y: 0 },
    type: "input", //edge go away of it not to it [act as parent]
    className: "flow-node",
  },
  {
    id: "2",
    data: { label: "2" },
    deletable:false,
    position: { x: 100, y: 100 },
    type: "output", //edge went to it not from it [ its a child]
  },
  {
    id: "3",
    data: { label: "3" },
    deletable:false,
    position: { x: 200, y: 200 },
    type: "default", //has ingoing outgoing and
  },
  {
    id: "4",
    data: { label: "4" },
    deletable:false,
    position: { x: 400, y: 400 },
    type: "flowNode",
  },
];

const initialEdges = [
  //   { id: "1-3", source: "1", target: "3", label: "to the", type: "step" },
  {
    id: "edges-e5-6",
    deletable:false,
    source: "1",
    target: "3",
    label: "styled label",
    labelStyle: { fill: "blue", fontWeight: 700 },
    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
  {
    id: "edges-e5-7",
    deletable:false,
    source: "1",
    target: "2",
    label: <button>'label with styled bg'</button>,
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: "#FFCC00", color: "#fff", fillOpacity: 0.7 },
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "edges",
    deletable:false,
    source: "1",
    target: "4",
    label: "label with styled bg",
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: "#FFCC00", color: "#fff", fillOpacity: 0.7 },
    animated: true,
    markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: '#FF0072',
      },
  },

  //   { id: "1-2", source: "1", target: "2",  type: "step" , animated: true,
  //   label: 'animated styled edge', labelStyle: { fill: 'red', fontWeight: 700 },
  //   markerEnd: {
  //     type: MarkerType.Arrow,
  //   },},
];

const BranchingFlow = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  return (
    <div style={{ height: "900px" }}>
      {/* <img src={endSurvey} id="end" /> */}
      
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        defaultEdgeOptions={defaultEdgeOptions}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background variant="dots" gap={12} size={1} color={"gray"} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
};

export default BranchingFlow;
