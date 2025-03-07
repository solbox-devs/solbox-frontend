"use client";

import { Box, Spinner, Text } from "@chakra-ui/react";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const sentences: string[] = [
  "Network — Earn instant commissions with a powerful peer-to-peer referral system",
  "Solana — Enjoy 100% crypto-based payouts directly to your wallet",
  "Game — Engage in exclusive Play-to-Earn games and win rewards",
  "Trading — Access crypto trading tools to grow your portfolio",
  "NFTs — Discover, buy, and sell digital collectibles",
  "Opportunity — Build your network and unlock unlimited residual incomes",
];

const gradientColors: string[] = [
  "linear-gradient(135deg, #1b1f3b, #3a4373)",
  "linear-gradient(135deg, #10312b, #205a50)",
  "linear-gradient(135deg, #1c2836, #345060)",
  "linear-gradient(135deg, #3b3b6d, #5454a0)",
  "linear-gradient(135deg, #164a41, #21897e)",
  "linear-gradient(135deg, #09203f, #537895)",
];

type CubeModelProps = {
  setDisplayedText: (text: string) => void;
  setBgGradient: (gradient: string) => void;
};

const CubeModel: React.FC<CubeModelProps> = ({
  setDisplayedText,
  setBgGradient,
}) => {
  const { scene, animations } = useGLTF("/models/output.glb"); // No `isLoading` here
  const [isModelLoaded, setIsModelLoaded] = useState(false); // Track if the model is loaded

  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const cubeRef = useRef<THREE.Object3D | null>(null);
  const textIndexRef = useRef<number>(0);
  const accumulatedTime = useRef<number>(0);
  const textChangeInterval = 3.05;

  useEffect(() => {
    if (!scene) return; // Ensure the scene is loaded

    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.material.needsUpdate = true;
        obj.material.metalness = 0.3;
        obj.material.roughness = 0.6;
        if (obj.material.color) {
          obj.material.color.convertSRGBToLinear();
        }
      }
    });

    if (animations.length > 0 && !mixerRef.current) {
      mixerRef.current = new THREE.AnimationMixer(scene);
      animations.forEach((clip) => {
        const action = mixerRef.current!.clipAction(clip);
        action.play();
      });
    }

    setIsModelLoaded(true); // Set the model as loaded
  }, [animations, scene]);

  useFrame((state, delta) => {
    if (!isModelLoaded) return; // Skip updates if the model is not loaded

    accumulatedTime.current += delta;

    if (accumulatedTime.current >= textChangeInterval) {
      accumulatedTime.current = 0;
      textIndexRef.current = (textIndexRef.current + 1) % sentences.length;
      setDisplayedText(sentences[textIndexRef.current]);
      setBgGradient(gradientColors[textIndexRef.current]);
    }

    mixerRef.current?.update(delta * 0.89);

    if (cubeRef.current) {
      const { mouse } = state;
      cubeRef.current.rotation.y = THREE.MathUtils.lerp(
        cubeRef.current.rotation.y,
        mouse.x * Math.PI,
        0.1
      );
      cubeRef.current.rotation.x = THREE.MathUtils.lerp(
        cubeRef.current.rotation.x,
        -mouse.y * Math.PI,
        0.1
      );
    }
  });

  return isModelLoaded ? (
    <primitive object={scene} ref={cubeRef} scale={3.5} />
  ) : null; // Only render the model after it's fully loaded
};

export default function SolBoxUI() {
  const [displayedText, setDisplayedText] = useState<string>(sentences[0]);
  const [bgGradient, setBgGradient] = useState<string>(gradientColors[0]);
  const [isLoading, setIsLoading] = useState(true); // Track if the model is loading

  const { scene } = useGLTF("/models/output.glb", true); // Pass `true` to trigger the loading process

  useEffect(() => {
    if (scene) {
      setIsLoading(false); // Set loading to false once the scene is ready
    }
  }, [scene]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedText((prevText) => {
        const nextIndex = (sentences.indexOf(prevText) + 1) % sentences.length;
        setBgGradient(gradientColors[nextIndex]);
        return sentences[nextIndex];
      });
    }, 2500);

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
              y: { duration: 0.8, ease: "easeInOut" },
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
                fontSize={{ base: "2xl", md: "5xl" }}
                fontWeight={700}
                lineHeight={{ base: "30px", md: "55px" }}
              >
                SolBox <br /> The Ultimate Web3 Platform on Solana
              </Text>
              <Text fontSize="md">{displayedText}</Text>
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
        {isLoading ? ( // Check isLoading here to show loader while the model is loading
          <Spinner size="xl" />
        ) : (
          <Canvas camera={{ position: [0, 2, 6], fov: 75 }}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[2, 5, 2]} intensity={2} />
            <Environment preset="warehouse" background={false} />
            <OrbitControls enableZoom={false} />
            <CubeModel
              setDisplayedText={setDisplayedText}
              setBgGradient={setBgGradient}
            />
          </Canvas>
        )}
      </Box>
    </Box>
  );
}
