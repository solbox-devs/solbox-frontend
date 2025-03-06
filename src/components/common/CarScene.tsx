"use client";
import { Box, Heading, Text } from "@chakra-ui/react";
import { Environment, useGLTF, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const title = "SolBox: The Ultimate Web3 Platform on Solana";
const sentences = [
  "Network — Earn instant commissions with a powerful peer-to-peer referral system",
  "Solana — Enjoy 100% crypto-based payouts directly to your wallet",
  "Game — Engage in exclusive Play-to-Earn games and win rewards",
  "Trading — Access crypto trading tools to grow your portfolio",
  "NFTs — Discover, buy, and sell digital collectibles",
  "Opportunity — Build your network and unlock unlimited residual incomes",
];

// **Updated Gradient Colors (No Brown)**
const gradientColors = [
  "linear-gradient(135deg, #1b1f3b, #3a4373)", // Dark Royal Blue
  "linear-gradient(135deg, #10312b, #205a50)", // Midnight Teal
  "linear-gradient(135deg, #1c2836, #345060)", // Steel Cyan
  "linear-gradient(135deg, #3b3b6d, #5454a0)", // Vibrant Purple
  "linear-gradient(135deg, #164a41, #21897e)", // Deep Green-Teal
  "linear-gradient(135deg, #09203f, #537895)", // Dark Sky Blue
];

// **Cube Component with Mouse Follow & Drag**
const CubeModel = ({
  setDisplayedText,
  setBgGradient,
}: {
  setDisplayedText: (text: string) => void;
  setBgGradient: (color: string) => void;
}) => {
  const { scene, animations } = useGLTF("/models/output.glb");
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const cubeRef = useRef<THREE.Group>(null);
  const textIndexRef = useRef(0);
  const accumulatedTime = useRef(0);
  const textChangeInterval = 3.05; // Change text every 3.05s

  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
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
  }, [animations, scene]);

  useFrame((state, delta) => {
    accumulatedTime.current += delta;

    if (accumulatedTime.current >= textChangeInterval) {
      accumulatedTime.current = 0;
      textIndexRef.current = (textIndexRef.current + 1) % sentences.length;
      setDisplayedText(sentences[textIndexRef.current]);
      setBgGradient(gradientColors[textIndexRef.current]);
    }

    if (mixerRef.current) {
      mixerRef.current.update(delta * 0.89);
    }

    // Cube follows mouse movement
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

  return (
    <primitive
      object={scene}
      ref={cubeRef}
      scale={2.3}
      rotation={[rotation.x, rotation.y, 0]}
    />
  );
};

export default function SolBoxUI() {
  const [displayedText, setDisplayedText] = useState(sentences[0]);
  const [bgGradient, setBgGradient] = useState(gradientColors[0]);
  const [textOpacity, setTextOpacity] = useState(1);
  const [textY, setTextY] = useState(50);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextOpacity(0); // Fade out
      setTextY(50); // Move text down

      setTimeout(() => {
        const nextIndex =
          (sentences.indexOf(displayedText) + 1) % sentences.length;
        setDisplayedText(sentences[nextIndex]);
        setBgGradient(gradientColors[nextIndex]); // Smooth Background Transition

        setTextOpacity(1); // Fade in
        setTextY(0); // Move text up smoothly
      }, 500); // Delay before changing text
    }, 3050);

    return () => clearInterval(interval);
  }, [displayedText]);

  return (
    <Box
      h="100vh"
      display="flex"
      transition="background 1.5s ease-in-out"
      style={{ background: bgGradient }}
    >
      {/* Left Side: Title & Animated Text */}
      <Box
        w="50%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p="6"
        color="white"
      >
        <Heading fontSize="3xl" textAlign="center" mb="4">
          {title}
        </Heading>
        <Box
          opacity={textOpacity}
          transform={`translateY(${textY}px)`}
          transition="opacity 0.5s ease, transform 0.5s ease"
        >
          <Text
            fontSize="xl"
            fontWeight="bold"
            textAlign="center"
            bg="rgba(0,0,0,0.5)"
            p="4"
            borderRadius="lg"
            boxShadow="xl"
          >
            {displayedText}
          </Text>
        </Box>
      </Box>

      {/* Right Side: Cube Animation with Drag & Hover */}
      <Box w="50%" display="flex" justifyContent="center" alignItems="center">
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
      </Box>
    </Box>
  );
}
