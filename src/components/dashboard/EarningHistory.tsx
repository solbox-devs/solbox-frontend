// import { Box, Button, Flex, Text } from "@chakra-ui/react";
// import { BsArrowUpRight } from "react-icons/bs";
// import EarningsChart from "./EarningsChart";
// import referralService from "@/services/referralService";
// import authService from "@/services/authService";

// const EarningHistory = () => {
//   const fetchEarningsHistory = async () => {
//     const userDetails: any = authService.getUser();
//     const parsedDetails = JSON.parse(userDetails);
//     const res = await referralService.getEarningsHistory(
//       parsedDetails?.walletAddress
//     );
//   };
//   return (
//     <Box p={2} borderRadius="md" bg="#262D33">
//       <Flex alignItems="center" justifyContent="space-between">
//         <Box>
//           <Text fontSize="sm">Earning history</Text>
//           <Text fontSize="xl">$5,789</Text>
//         </Box>
//         <Box>
//           <Flex alignItems="center" gap={2}>
//             <Button
//               size="xs"
//               leftIcon={<BsArrowUpRight />}
//               borderRadius="2xl"
//               color="white"
//               bg="#615FFF"
//               _hover={{ background: "#615FFF" }}
//             >
//               46.9%
//             </Button>
//             <Text fontSize="xs">from $4,430.21</Text>
//           </Flex>
//         </Box>
//       </Flex>
//       <Box mt={4}>
//         <EarningsChart />
//       </Box>
//     </Box>
//   );
// };

// export default EarningHistory;

"use client";

import { useEffect, useState } from "react";
import { Box, Button, Flex, Text, Skeleton, useToast } from "@chakra-ui/react";
import { BsArrowUpRight } from "react-icons/bs";
import EarningsChart from "./EarningsChart";
import referralService from "@/services/referralService";
import authService from "@/services/authService";

interface EarningsData {
  totalEarnings: string;
  percentageChange: string;
  changeFrom: string;
  earningsHistory: {
    month: string;
    earnings: string;
  }[];
}

const EarningHistory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [earningsData, setEarningsData] = useState<EarningsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    fetchEarningsHistory();
  }, []);

  const fetchEarningsHistory = async () => {
    try {
      setIsLoading(true);
      const userDetails = authService.getUser();
      const parsedDetails = userDetails ? JSON.parse(userDetails) : null;

      if (!parsedDetails?.walletAddress) {
        throw new Error("Wallet address not found");
      }

      const res = await referralService.getEarningsHistory(
        parsedDetails.walletAddress
      );

      if (res.success) {
        setEarningsData(res.data);
      } else {
        throw new Error(res.message || "Failed to fetch earnings history");
      }
    } catch (err) {
      console.error("Error fetching earnings history:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      toast({
        title: "Error",
        description:
          err instanceof Error ? err.message : "Failed to load earnings data",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (value: string) => {
    return `$${Number.parseFloat(value).toFixed(2)}`;
  };

  return (
    <Box p={2} borderRadius="md" bg="#262D33">
      <Flex alignItems="center" justifyContent="space-between">
        <Box>
          <Text fontSize="sm">Earning history</Text>
          {isLoading ? (
            <Skeleton
              height="24px"
              width="100px"
              startColor="#3A4149"
              endColor="#494F54"
            />
          ) : (
            <Text fontSize="xl">
              {earningsData
                ? formatCurrency(earningsData.totalEarnings)
                : "$0.00"}
            </Text>
          )}
        </Box>
        <Box>
          {isLoading ? (
            <Flex alignItems="center" gap={2}>
              <Skeleton
                height="20px"
                width="60px"
                startColor="#3A4149"
                endColor="#494F54"
              />
              <Skeleton
                height="16px"
                width="100px"
                startColor="#3A4149"
                endColor="#494F54"
              />
            </Flex>
          ) : (
            <Flex alignItems="center" gap={2}>
              <Button
                size="xs"
                leftIcon={<BsArrowUpRight />}
                borderRadius="2xl"
                color="white"
                bg="#615FFF"
                _hover={{ background: "#615FFF" }}
              >
                {earningsData?.percentageChange || "0.0"}%
              </Button>
              <Text fontSize="xs">
                from {formatCurrency(earningsData?.changeFrom || "0.00")}
              </Text>
            </Flex>
          )}
        </Box>
      </Flex>
      <Box mt={4}>
        {isLoading ? (
          <Skeleton height="300px" startColor="#3A4149" endColor="#494F54" />
        ) : error ? (
          <Flex height="300px" alignItems="center" justifyContent="center">
            <Text color="red.400">{error}</Text>
          </Flex>
        ) : (
          <EarningsChart data={earningsData?.earningsHistory || []} />
        )}
      </Box>
    </Box>
  );
};

export default EarningHistory;
