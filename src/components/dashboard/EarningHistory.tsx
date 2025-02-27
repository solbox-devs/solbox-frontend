import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { BsArrowUpRight } from "react-icons/bs";
import EarningsChart from "./EarningsChart";
const EarningHistory = () => {
  return (
    <Box p={2} borderRadius="md" bg="#262D33">
      <Flex alignItems="center" justifyContent="space-between">
        <Box>
          <Text fontSize="sm">Earning history</Text>
          <Text fontSize="xl">$5,789</Text>
        </Box>
        <Box>
          <Flex alignItems="center" gap={2}>
            <Button
              size="xs"
              leftIcon={<BsArrowUpRight />}
              borderRadius="2xl"
              color="white"
              bg="#615FFF"
              _hover={{ background: "#615FFF" }}
            >
              46.9%
            </Button>
            <Text fontSize="xs">from $4,430.21</Text>
          </Flex>
        </Box>
      </Flex>
      <Box mt={4}>
        <EarningsChart />
      </Box>
    </Box>
  );
};

export default EarningHistory;
