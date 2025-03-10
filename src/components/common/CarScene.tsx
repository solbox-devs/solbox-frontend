"use client";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import the CubeModel component to prevent SSR
const CubeModel = dynamic(() => import("./CubeModel"), { ssr: false });

const sentences: string[] = [
  "Network — Earn instant commissions with a powerful peer-to-peer referral system",
  "Solana — Enjoy 100% crypto-based payouts directly to your wallet",
  "Game — Engage in exclusive Play-to-Earn games and win rewards",
  "Trading — Access crypto trading tools to grow your portfolio",
  "NFTs — Discover, buy, and sell digital collectibles",
  "Opportunity — Build your network and unlock unlimited residual incomes",
];

const gradientColors: string[] = [
  "linear-gradient(130deg, #1b1f3b, #3a4373)",
  "linear-gradient(130deg, #10312b, #205a50)",
  "linear-gradient(130deg, #1c2836, #345060)",
  "linear-gradient(130deg, #3b3b6d, #5454a0)",
  "linear-gradient(130deg, #164a41, #21897e)",
  "linear-gradient(130deg, #09203f, #537895)",
];

export default function SolBoxUI() {
  const [displayedText, setDisplayedText] = useState<string>(sentences[0]);
  const [bgGradient, setBgGradient] = useState<string>(gradientColors[0]);
  const [isLoading, setIsLoading] = useState(true); // Track if the model is loading

  // No need to load the GLTF here since CubeModel will handle the loading
  useEffect(() => {
    setIsLoading(false); // Set loading to false once the model is ready
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedText((prevText) => {
        const nextIndex = (sentences.indexOf(prevText) + 1) % sentences.length;
        setBgGradient(gradientColors[nextIndex]);
        return sentences[nextIndex];
      });
    }, 2700);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      h="100vh"
      display="flex"
      flexDirection={{ base: "column-reverse", md: "row" }}
      transition="background 3s cubic-bezier(0.4, 0, 0.2, 1)"
      style={{ background: bgGradient }}
    >
      <Box
        w={{ base: "100%", md: "50%" }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p="6"
        color="white"
        position="relative"
        overflow="hidden"
        minH={{ base: "45vh", md: "auto" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={displayedText}
            initial={{ y: "100vh", opacity: 0 }}
            animate={{ y: "0vh", opacity: 1 }}
            exit={{ y: "-100vh", opacity: 0 }}
            transition={{
              y: { duration: 0.9, ease: "easeInOut" },
              opacity: { duration: 0.4, ease: "easeInOut" },
            }}
            style={{ position: "absolute", textAlign: "center" }}
          >
            <Box
              w={{ base: "100%", md: "500px" }}
              p={{ base: 5, md: "0px" }}
              textAlign="left"
            >
              <Text
                fontSize={{ base: "2xl", md: "4xl" }}
                fontWeight={700}
                lineHeight={{ base: "30px", md: "45px" }}
              >
                {displayedText}
              </Text>
              <Text fontSize="sm">
                SolBox is the first all-in-one Web3 platform built on Solana,
                giving you everything you need to navigate the crypto world and
                achieve financial freedom.
              </Text>
            </Box>
          </motion.div>
        </AnimatePresence>
      </Box>

      <Box
        w={{ base: "100%", md: "50%" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH={{ base: "35vh", md: "auto" }}
      >
        {isLoading ? (
          <Spinner size="xl" />
        ) : (
          <Canvas camera={{ position: [2, 2, 6], fov: 75 }}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[2, 4, 2]} intensity={2} />
            <Environment preset="warehouse" background={false} />
            <OrbitControls enableZoom={false} />
            <CubeModel
              sentences={sentences}
              gradientColors={gradientColors}
              setDisplayedText={setDisplayedText}
              setBgGradient={setBgGradient}
            />
          </Canvas>
        )}
      </Box>
    </Box>
  );
}
