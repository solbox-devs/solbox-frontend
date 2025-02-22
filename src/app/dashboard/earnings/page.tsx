import EarningPiChart from "@/components/earnings/EarningPichart";
import TotalEarningTable from "@/components/earnings/TotalEarningTable";
import { Box, Flex, Text } from "@chakra-ui/react";

const EarningsMainPage = () => {
  return (
    <Box m={4}>
      <Text fontSize="xl" fontWeight={500}>
        Earnings Page
      </Text>
      <Box my={5} bg="#262D33" p={4} borderRadius="xl">
        <Flex alignItems="center" gap={5}>
          <Box>
            <EarningPiChart />
          </Box>
          <Box>
            <Text fontSize="sm" fontWeight={300} color="gray.400">
              My Balance
            </Text>
            <Text fontSize="2xl" fontWeight={500}>
              $1000,00
            </Text>
            <Text fontSize="sm" fontWeight={300} color="gray.400">
              Show Amount Balance in dropdown would be
            </Text>
          </Box>
        </Flex>
      </Box>
      <Box my={5} bg="#262D33" p={4} borderRadius="xl">
        <Text fontSize="md" fontWeight={500} my={4}>
          Total earnings per user
        </Text>
        <TotalEarningTable />
      </Box>
    </Box>
  );
};

export default EarningsMainPage;
