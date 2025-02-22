import logo from "@/assets/logo-1.png";
import SignupForm from "@/components/Signup/SignupForm";
import { Box, Image, SimpleGrid } from "@chakra-ui/react";
const WalletMainPage = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100vh"
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <Box>
          <SignupForm />
        </Box>
        <Box
          bg="#262D33"
          borderRadius="md"
          p={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image src={logo.src} alt="logo" />
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default WalletMainPage;
