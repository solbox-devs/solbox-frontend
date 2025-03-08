"use client";
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
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={1}>
        <Box
          h="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <SignupForm />
        </Box>
        <Box
          p={2}
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          justifyContent="center"
          w="100%"
          h="100vh"
        >
          <Box w="100%" h="90vh" bg="#262D33" borderRadius="md">
            <Image src={logo.src} alt="logo" w="100%" h="100%" />
          </Box>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default SignupPage;
