"use client";
import logo from "@/assets/logo-1.png";
import { Box, Button, HStack, Image } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const TopNav = () => {
  const router = useRouter();

  const launchApp = () => {
    router.push("/connect-wallet");
  };

  return (
    <Box
      position="fixed"
      top={2}
      left={2}
      right={2}
      p={2}
      //   bg="rgba(255, 255, 255, 0.1)" // Transparent background with white tint
      borderRadius="md"
      backdropFilter="blur(10px)" // Glassmorphism effect
      zIndex={9999}
      // boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)" // Optional: subtle shadow for the top bar
    >
      <HStack justify="space-between" align="center">
        <Box h={15} w={20}>
          <Image src={logo.src} alt="logo" objectFit="cover" />
        </Box>

        {/* Launch App Button */}
        <Box>
          <Button
            variant="primary"
            borderRadius="3xl"
            fontSize="12px"
            fontWeight={500}
            size="sm"
            onClick={launchApp}
          >
            Launch App
          </Button>
        </Box>
      </HStack>
    </Box>
  );
};

export default TopNav;
