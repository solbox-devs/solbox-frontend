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

      if (res.success) {
        const rootNode: ReferralNode = {
          name: res.data.user.username,
          username: res.data.user.username,
          walletAddress: res.data.user.walletAddress,
          spent: 0,
          earnings: res.data.user.earnings,
          referralSpent: res.data.totalEarningsFromDirects,
          package: res.data.user.package,
          children: res.data.directReferrals.map((referral: any) => ({
            name: referral.username,
            username: referral.username,
            walletAddress: referral.walletAddress,
            spent: 0,
            earnings: referral.earnings,
            referralSpent: referral.commissionFromReferral,
            package: referral.package,
            children: [],
          })),
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

      setHistory([...history, currentNode as ReferralNode]);

      const res = await referralService.getDirectReferrals(node.walletAddress);

      if (res.success) {
        const updatedNode: ReferralNode = {
          ...node,
          children: res.data.directReferrals.map((referral: any) => ({
            name: referral.username,
            username: referral.username,
            walletAddress: referral.walletAddress,
            spent: 0,
            earnings: referral.earnings,
            referralSpent: referral.commissionFromReferral,
            package: referral.package,
            children: [],
          })),
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
        {currentNode.name}&apos;s Referral Tree
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
  const sortedChildren = [...data.children]
    .sort((a, b) => b.earnings - a.earnings)
    .slice(0, 5);

  const getPackageColor = (packageType: string) => {
    switch (packageType.toLowerCase()) {
      case "premium":
        return "#615FFF";
      case "pro":
        return "#FF9900";
      case "basic":
      default:
        return "#4A9D77";
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
        // borderColor={getPackageColor(data.package)}
        borderColor={"#fff"}
      >
        <Text fontWeight="bold">{data.name}</Text>
        <Text>Earnings: {data.earnings.toFixed(4)}</Text>
        <Text color="orange.300">
          From Referrals: {data.referralSpent.toFixed(4)}
        </Text>
        <Text fontSize="xs" color={getPackageColor(data.package)} mt={1}>
          {data.package.toUpperCase()}
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
              key={child.walletAddress}
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
                // borderColor={getPackageColor(child.package)}
                borderColor={"#fff"}
              >
                <Text fontWeight={500}>{child.name}</Text>
                <Text>Earnings: {child.earnings.toFixed(4)}</Text>
                <Text color="orange.300">
                  From Referrals: {child.referralSpent.toFixed(4)}
                </Text>
                <Text
                  fontSize="xs"
                  color={getPackageColor(child.package)}
                  mt={1}
                >
                  {child.package.toUpperCase()}
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
