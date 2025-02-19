/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Box } from "@chakra-ui/react";
import { useCallback } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Node,
  Position,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
  {
    id: "1",
    data: { label: "Root" },
    position: { x: 250, y: 5 },
    sourcePosition: Position.Bottom,
  },
  {
    id: "2",
    data: { label: "Child 1" },
    position: { x: 100, y: 100 },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: "3",
    data: { label: "Child 2" },
    position: { x: 400, y: 100 },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-3", source: "1", target: "3" },
];

const ReferralTree = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds: any) => addEdge(params, eds)),
    [setEdges]
  );

  // Function to handle node clicks
  const handleNodeClick = (event: React.MouseEvent, node: Node) => {
    if (node.id === "2" && !nodes.some((n) => n.id === "4")) {
      // Check if Child 1 has been clicked and Child 1's children aren't added
      // Add child nodes for "Child 1"
      setNodes((nds) => [
        ...nds,
        {
          id: "4",
          data: { label: "Child 1.1" },
          position: { x: 50, y: 200 },
          sourcePosition: Position.Bottom,
          targetPosition: Position.Top,
        },
        {
          id: "5",
          data: { label: "Child 1.2" },
          position: { x: 150, y: 200 },
          sourcePosition: Position.Bottom,
          targetPosition: Position.Top,
        },
        {
          id: "6",
          data: { label: "Child 1.3" },
          position: { x: 250, y: 200 },
          sourcePosition: Position.Bottom,
          targetPosition: Position.Top,
        },
      ]);
      setEdges((eds) => [
        ...eds,
        { id: "e2-4", source: "2", target: "4" },
        { id: "e2-5", source: "2", target: "5" },
        { id: "e2-6", source: "2", target: "6" },
      ]);
    }
  };

  return (
    <Box width="100%" height="500px" bg="gray.800" borderRadius="md" p={4}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick} // Add the onNodeClick handler here
        fitView
      >
        {/* <MiniMap /> */}
        {/* <Controls /> */}
        <Background />
      </ReactFlow>
    </Box>
  );
};

export default ReferralTree;
