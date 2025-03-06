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
  const [rotation, setRotation] = useState(0); // Track the rotation state
  const [targetRotation, setTargetRotation] = useState(0); // Target rotation for smooth transition

  // Handle Wheel Scroll Effect
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      setTargetRotation((prev) => {
        const newRotation = prev + event.deltaY * 0.01; // Adjust sensitivity for scroll
        return Math.max(-Math.PI, Math.min(Math.PI, newRotation)); // Limit rotation range
      });
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  // Smoothly interpolate the rotation to the target rotation
  useFrame(() => {
    setRotation((prevRotation) => {
      return THREE.MathUtils.lerp(prevRotation, targetRotation, 0.1); // 0.1 for smoothness
    });

    if (carRef.current) {
      carRef.current.rotation.y = rotation; // Apply the interpolated rotation on the Y-axis
    }
  });

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
    <>
      <primitive object={scene} ref={carRef} scale={3.5} />
    </>
  );
};

export default function CarScene() {
  return (
    <Box
      h="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
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
    </Box>
  );
}
