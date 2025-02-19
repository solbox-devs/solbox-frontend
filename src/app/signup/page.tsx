import logo from "@/assets/banner.png";
import SignupForm from "@/components/Signup/SignupForm";
import { Box, Image, SimpleGrid } from "@chakra-ui/react";
const SignupPage = () => {
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
          w="350px"
          h="400px"
        >
          <Image src={logo.src} alt="logo" w="100%" h="100%" />
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default SignupPage;
