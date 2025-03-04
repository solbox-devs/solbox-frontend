"use client";
import logo from "@/assets/banner.png";
import SolanaWalletButton from "@/components/core/SolanaWalletButton";
import { Box, Image, SimpleGrid, Text, useToast } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import authService from "../../services/authService";

const ConnectWallet = () => {
  const { connected, publicKey } = useWallet();
  const toast = useToast();
  const router = useRouter();

  const handleUserLogin = useCallback(async () => {
    try {
      const res: any = await authService.userLogin({
        walletAddress: publicKey?.toBase58(),
      });

      console.log("res", res);

      if (res?.success) {
        router.push("/dashboard");
      }
    } catch (error: any) {
      // Check if it's a 404 error
      if (error.response?.status === 404) {
        router.push("/signup"); // Redirect to signup page on 404
      } else {
        toast({
          title: "Login Failed",
          description: error.message || "An error occurred during login",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  }, [publicKey, router, toast]); // Updated dependencies

  useEffect(() => {
    if (connected && publicKey) {
      handleUserLogin();
    }
  }, [connected, publicKey, handleUserLogin]);

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
            <SolanaWalletButton />
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
