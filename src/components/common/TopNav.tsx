"use client";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
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
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)" // Optional: subtle shadow for the top bar
    >
      <HStack justify="space-between" align="center">
        {/* Logo */}
        <div style={{ width: "200px", height: "60px", objectFit: "cover" }}>
          <img src="/SOLBOX_A5.png" />
        </div>

        {/* Launch App Button */}
        <Box>
          <Button
            variant="primary"
            borderRadius="3xl"
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
