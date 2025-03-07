"use client";
import CarScene from "@/components/common/CarScene";
import TopNav from "@/components/common/TopNav";
import { Box } from "@chakra-ui/react";

const LandingPage = () => {
  return (
    <Box>
      <TopNav />
      <CarScene />
    </Box>
  );
};

export default LandingPage;
