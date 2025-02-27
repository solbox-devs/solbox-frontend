/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Box, Button, Divider, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { SetStateAction, useState } from "react";

const initialData = {
  name: "Kaitlyn Stone",
  spent: 357.5,
  referralSpent: 3170,
  children: [
    {
      name: "Jessa Bolinger",
      spent: 703,
      referralSpent: 969.5,
      children: [
        { name: "Brooke Jenkins", spent: 393, referralSpent: 0, children: [] },
        { name: "Diana Moses", spent: 576.5, referralSpent: 0, children: [] },
      ],
    },
    {
      name: "Matthew Ericson",
      spent: 534,
      referralSpent: 158,
      children: [
        { name: "Steve Stone", spent: 158, referralSpent: 0, children: [] },
      ],
    },
    { name: "Trin Stone", spent: 448, referralSpent: 0, children: [] },
    { name: "Alice Johnson", spent: 720, referralSpent: 500, children: [] },
    { name: "Charlie Adams", spent: 600, referralSpent: 350, children: [] },
  ],
};

const ReferralTree = () => {
  const [history, setHistory] = useState<(typeof initialData)[]>([]);
  const [currentNode, setCurrentNode] = useState(initialData);

  const handleNodeClick = (
    node: SetStateAction<{
      name: string;
      spent: number;
      referralSpent: number;
      children: {
        name: string;
        spent: number;
        referralSpent: number;
        children: {
          name: string;
          spent: number;
          referralSpent: number;
          children: never[];
        }[];
      }[];
    }>
  ) => {
    setHistory([...history, currentNode]);
    setCurrentNode(node);
  };

  const handleBack = () => {
    if (history.length > 0) {
      setCurrentNode(history[history.length - 1]);
      setHistory(history.slice(0, -1));
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      p={6}
      bg="#262D33"
      borderRadius="md"
      minH="50vh"
    >
      <Text fontSize="xl" fontWeight="bold">
        {currentNode.name}&apos;s Referral Tree
      </Text>
      {history.length > 0 && (
        <Button
          mt={2}
          onClick={handleBack}
          size="sm"
          variant="primary"
          w="150px"
          mb={4}
        >
          Back
        </Button>
      )}
      <Divider my={1} />
      <TreeNode data={currentNode} onNodeClick={handleNodeClick} />
    </Flex>
  );
};

const TreeNode = ({ data, onNodeClick }: any) => {
  // Sort children by highest `spent` and pick the top 5
  const sortedChildren = [...data.children]
    .sort((a, b) => b.spent - a.spent)
    .slice(0, 5);

  return (
    <Flex direction="column" align="center" my={4}>
      <Box
        as={motion.div}
        whileHover={{ scale: 1.05 }}
        p={4}
        borderWidth={1}
        color="white"
        textAlign="center"
        borderRadius="md"
        boxShadow="md"
        minW="200px"
      >
        <Text fontWeight="bold">{data.name}</Text>
        <Text>Spent: {data.spent.toFixed(2)}</Text>
        <Text color="orange.300">
          Referral: {data.referralSpent.toFixed(2)}
        </Text>
      </Box>

      {sortedChildren.length > 0 && (
        <Flex gap={6} position="relative">
          <Box
            position="absolute"
            w="2px"
            h="60px"
            bg="gray.500"
            left="50%"
            transform="translateX(-50%)"
          />
          {sortedChildren.map((child) => (
            <Flex key={child.name} direction="column" align="center" mt={16}>
              <Box
                as={motion.div}
                whileHover={{ scale: 1.05 }}
                p={4}
                borderWidth={1}
                color="white"
                textAlign="center"
                borderRadius="md"
                boxShadow="md"
                minW="200px"
                cursor="pointer"
                onClick={() => onNodeClick(child)}
              >
                <Text fontWeight={500}>{child.name}</Text>
                <Text>Spent: {child.spent.toFixed(2)}</Text>
                <Text color="orange.300">
                  Referral: {child.referralSpent.toFixed(2)}
                </Text>
                <Text fontSize="sm" color="gray.400">
                  {child.children.length > 0
                    ? `${child.children.length} child${
                        child.children.length > 1 ? "ren" : ""
                      }`
                    : "No children"}
                </Text>
              </Box>
            </Flex>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default ReferralTree;
