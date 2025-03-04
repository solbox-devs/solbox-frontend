/* eslint-disable prefer-const */
"use client";
import { Box } from "@chakra-ui/react";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const CarModel = () => {
  const { scene, animations } = useGLTF("/models/output.glb");
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const carRef = useRef<THREE.Group>(null);
  const [offsetX, setOffsetX] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  // Handle Wheel Scroll Effect
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      setOffsetX((prev) => {
        let newOffset = prev + event.deltaY * 0.001; // Adjust sensitivity
        return Math.max(-0.5, Math.min(0.5, newOffset)); // Limit movement range
      });
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  // Update Model Position
  useFrame(() => {
    if (carRef.current) {
      carRef.current.position.x = offsetX;
    }
  });

  // Toggle Animation on Click
  const handleClick = () => {
    if (mixerRef.current) {
      if (isPaused) {
        // Resume all animations
        mixerRef.current.timeScale = 1;
      } else {
        // Pause all animations
        mixerRef.current.timeScale = 0;
      }
      setIsPaused(!isPaused);
    }
  };

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.material.needsUpdate = true;

        // Convert colors correctly
        if (obj.material.color) {
          obj.material.color.convertSRGBToLinear();
        }

        // Fix pure white appearance
        obj.material.metalness = 0.3; // Reduce metalness
        obj.material.roughness = 0.6; // Increase roughness

        // Ensure textures are loaded
        if (obj.material.map) {
          obj.material.map.needsUpdate = true;
        }
      }
    });

    // Handle animations
    if (animations.length > 0 && !mixerRef.current) {
      mixerRef.current = new THREE.AnimationMixer(scene);
      animations.forEach((clip) => {
        const action = mixerRef.current!.clipAction(clip);
        action.play();
      });
    }
  }, [animations, scene]);

  useFrame((_, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  return (
    <primitive object={scene} ref={carRef} scale={3.5} onClick={handleClick} />
  );
};

export default function CarScene() {
  return (
    <Box
      h="60vh"
      w="50vw"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Canvas camera={{ position: [0, 2, 6], fov: 75 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[2, 5, 2]} intensity={2} />
        <Environment preset="city" background={false} />

        <CarModel />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </Box>
  );
}
