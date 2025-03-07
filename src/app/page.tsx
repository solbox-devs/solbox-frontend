"use client";
import SolBoxUI from "@/components/common/CarScene";
import TopNav from "@/components/common/TopNav";
import { Box } from "@chakra-ui/react";

const LandingPage = () => {
  return (
    <Box>
      <TopNav />
      <Box>
        <SolBoxUI />
      </Box>
    </Box>
  );
};

export default LandingPage;
