import CarScene from "@/components/common/CarScene";
import { Box, Button, Text } from "@chakra-ui/react";

const Home = () => {
  return (
    <div>
      <Box
        h="100vh"
        w="100vw"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box display="flex" justifyContent="center" alignItems="center" m={5}>
          <Box w="30%">
            <Text fontSize="md" color="gray.200">
              Welcome to,
            </Text>
            <Text
              fontSize="5xl"
              color="white"
              fontWeight={800}
              lineHeight="50px"
            >
              Solbox – Solana Testnet Sandbox
            </Text>
            <Text fontSize="sm" color="gray.200" mt={4}>
              Solbox is a cutting-edge testnet platform built on Solana,
              enabling developers to experiment, deploy, and refine blockchain
              applications in a risk-free environment. 🚀
            </Text>
            <Button mt={5} variant="primary">
              Get Started
            </Button>
          </Box>

          <CarScene />
        </Box>
      </Box>
    </div>
  );
};

export default Home;
