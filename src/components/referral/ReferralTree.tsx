"use client";

import authService from "@/services/authService";
import referralService from "@/services/referralService";
import {
  Box,
  Button,
  Divider,
  Flex,
  Text,
  useToast,
  Skeleton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ReferralNode {
  name: string;
  username: string;
  walletAddress: string;
  spent: number;
  earnings: number;
  referralSpent: number;
  package: string;
  children: ReferralNode[];
}

interface ApiResponse {
  success: boolean;
  data: {
    referrer: {
      username: string;
      walletAddress: string;
      earnings: number;
      package: string;
    };
    directReferrals: Array<{
      _id: string;
      username: string;
      walletAddress: string;
      earnings: number;
      package: string;
      createdAt: string;
      referralCount: number;
      commissionFromReferral: number;
    }>;
    totalDirectReferrals: number;
    totalEarningsFromDirects: number;
    user: {
      username: string;
      walletAddress: string;
      earnings: number;
      package: string;
      maxDirectReferrals: number;
    };
  };
}

const ReferralTree = () => {
  const [history, setHistory] = useState<ReferralNode[]>([]);
  const [currentNode, setCurrentNode] = useState<ReferralNode | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    fetchReferralData();
  }, []);

  const fetchReferralData = async () => {
    try {
      setIsLoading(true);
      const userDetails = authService.getUser();
      const parsedDetails = userDetails ? JSON.parse(userDetails) : null;

      if (!parsedDetails?.walletAddress) {
        throw new Error("Wallet address not found");
      }

      const res = await referralService.getDirectReferrals(
        parsedDetails.walletAddress
      );

      if (res.success && res.data) {
        // Add null checks for all data properties
        const rootNode: ReferralNode = {
          name: res.data.user?.username || "Unknown",
          username: res.data.user?.username || "Unknown",
          walletAddress: res.data.user?.walletAddress || "",
          spent: 0,
          earnings: res.data.user?.earnings || 0,
          referralSpent: res.data.totalEarningsFromDirects || 0,
          package: res.data.user?.package || "basic",
          children: Array.isArray(res.data.directReferrals)
            ? res.data.directReferrals.map((referral: any) => ({
                name: referral?.username || "Unknown",
                username: referral?.username || "Unknown",
                walletAddress: referral?.walletAddress || "",
                spent: 0,
                earnings: referral?.earnings || 0,
                referralSpent: referral?.commissionFromReferral || 0,
                package: referral?.package || "basic",
                children: [],
              }))
            : [],
        };

        setCurrentNode(rootNode);
      } else {
        throw new Error(res.message || "Failed to fetch referral data");
      }
    } catch (err) {
      console.error("Error fetching referral data:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      toast({
        title: "Error",
        description:
          err instanceof Error ? err.message : "Failed to load referral data",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNodeClick = async (node: ReferralNode) => {
    try {
      setIsLoading(true);

      if (currentNode) {
        setHistory([...history, currentNode]);
      }

      const res = await referralService.getDirectReferrals(node.walletAddress);

      if (res.success && res.data) {
        const updatedNode: ReferralNode = {
          ...node,
          children: Array.isArray(res.data.directReferrals)
            ? res.data.directReferrals.map((referral: any) => ({
                name: referral?.username || "Unknown",
                username: referral?.username || "Unknown",
                walletAddress: referral?.walletAddress || "",
                spent: 0,
                earnings: referral?.earnings || 0,
                referralSpent: referral?.commissionFromReferral || 0,
                package: referral?.package || "basic",
                children: [],
              }))
            : [],
        };

        setCurrentNode(updatedNode);
      } else {
        throw new Error(res.message || "Failed to fetch referral data");
      }
    } catch (err) {
      console.error("Error fetching node data:", err);
      toast({
        title: "Error",
        description:
          err instanceof Error ? err.message : "Failed to load referral data",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (history.length > 0) {
      setCurrentNode(history[history.length - 1]);
      setHistory(history.slice(0, -1));
    }
  };

  if (isLoading && !currentNode) {
    return (
      <Flex
        direction="column"
        align="center"
        p={6}
        bg="#262D33"
        borderRadius="md"
        minH="50vh"
      >
        <Skeleton height="30px" width="200px" mb={4} />
        <Skeleton height="200px" width="100%" />
      </Flex>
    );
  }

  if (error || !currentNode) {
    return (
      <Flex
        direction="column"
        align="center"
        p={6}
        bg="#262D33"
        borderRadius="md"
        minH="50vh"
        justify="center"
      >
        <Text color="red.400">{error || "No data available"}</Text>
      </Flex>
    );
  }

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
        {currentNode.name || "Unknown"}&apos;s Referral Tree
      </Text>
      {history.length > 0 && (
        <Button
          mt={2}
          onClick={handleBack}
          size="sm"
          colorScheme="blue"
          w="150px"
          mb={4}
        >
          Back
        </Button>
      )}
      <Divider my={1} />
      {isLoading ? (
        <Flex direction="column" align="center" my={4} w="100%">
          <Skeleton height="100px" width="200px" mb={8} />
          <Flex gap={6} flexWrap="wrap" justify="center">
            <Skeleton height="100px" width="180px" />
            <Skeleton height="100px" width="180px" />
            <Skeleton height="100px" width="180px" />
          </Flex>
        </Flex>
      ) : (
        <TreeNode data={currentNode} onNodeClick={handleNodeClick} />
      )}
    </Flex>
  );
};

const TreeNode = ({
  data,
  onNodeClick,
}: {
  data: ReferralNode;
  onNodeClick: (node: ReferralNode) => void;
}) => {
  // Add null check for children array
  const sortedChildren = Array.isArray(data.children)
    ? [...data.children]
        .sort((a, b) => (b.earnings || 0) - (a.earnings || 0))
        .slice(0, 5)
    : [];

  const getPackageColor = (packageType: string | undefined | null) => {
    // Handle null/undefined packageType
    if (!packageType) return "#4A9D77"; // Default color for missing package

    try {
      switch (packageType.toLowerCase()) {
        case "premium":
          return "#615FFF";
        case "pro":
          return "#FF9900";
        case "basic":
          return "#4A9D77";
        default:
          return "#4A9D77";
      }
    } catch (error) {
      // If toLowerCase() fails for any reason, return default color
      console.error("Error processing package type:", error);
      return "#4A9D77";
    }
  };

  // Safely format numbers with fallbacks
  const formatNumber = (value: number | undefined | null) => {
    if (value === undefined || value === null) return "0.0000";
    try {
      return value.toFixed(4);
    } catch (error) {
      return "0.0000";
    }
  };

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
        mt="20px"
        borderColor={"#fff"}
      >
        <Text fontWeight="bold">{data.name || "Unknown"}</Text>
        <Text>Earnings: {formatNumber(data.earnings)}</Text>
        <Text color="orange.300">
          From Referrals: {formatNumber(data.referralSpent)}
        </Text>
        <Text fontSize="xs" color={getPackageColor(data.package)} mt={1}>
          {(data.package || "BASIC").toUpperCase()}
        </Text>
      </Box>

      {sortedChildren.length > 0 && (
        <Flex
          gap={6}
          position="relative"
          flexWrap="wrap"
          justify="center"
          mt={8}
          marginTop={"60px"}
        >
          <Box
            position="absolute"
            w="2px"
            h="60px"
            bg="gray.500"
            left="50%"
            transform="translateX(-50%)"
            top="-60px"
          />
          {sortedChildren.map((child) => (
            <Flex
              key={child.walletAddress || Math.random().toString()}
              direction="column"
              align="center"
              mb={4}
            >
              <Box
                as={motion.div}
                whileHover={{ scale: 1.05 }}
                p={4}
                borderWidth={1}
                color="white"
                textAlign="center"
                borderRadius="md"
                boxShadow="md"
                minW="180px"
                cursor="pointer"
                onClick={() => onNodeClick(child)}
                borderColor={"#fff"}
              >
                <Text fontWeight={500}>{child.name || "Unknown"}</Text>
                <Text>Earnings: {formatNumber(child.earnings)}</Text>
                <Text color="orange.300">
                  From Referrals: {formatNumber(child.referralSpent)}
                </Text>
                <Text
                  fontSize="xs"
                  color={getPackageColor(child.package)}
                  mt={1}
                >
                  {(child.package || "BASIC").toUpperCase()}
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
