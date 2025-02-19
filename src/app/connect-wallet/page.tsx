import logo from "@/assets/banner.png";
import { Box, Button, Image, SimpleGrid, Text } from "@chakra-ui/react";
const ConnectWallet = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100vh"
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <Box
          w="350px"
          h="400px"
          bg="#262D33"
          borderRadius="md"
          p={4}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box>
            <Box textAlign="center" my={5} mb={4}>
              <Text fontSize="md" color="#9D48C7">
                Welcome Back!
              </Text>
              <Text fontSize="xl" color="white" fontWeight={500}>
                Login with your wallet
              </Text>
            </Box>
            <Button variant="primary">Connect Wallet</Button>
          </Box>
        </Box>
        <Box
          bg="#262D33"
          borderRadius="md"
          p={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
          w="350px"
          h="400px"
        >
          <Image src={logo.src} alt="logo" h="100%" width="100%" />
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default ConnectWallet;
