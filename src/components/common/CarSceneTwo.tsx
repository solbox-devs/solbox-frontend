"use client";
import { Box, Text } from "@chakra-ui/react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion"; // Import Framer Motion
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const faceTexts = [
  "Front Side",
  "Back Side",
  "Right Side",
  "Left Side",
  "Top Side",
  "Bottom Side",
];

const CarModel = ({ setCurrentFace, setDragPosition, rotationIndex }) => {
  const { scene, animations } = useGLTF("/models/output.glb");
  const modelRef = useRef();
  const mixerRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [startDrag, setStartDrag] = useState([0, 0]);
  const [drag, setDrag] = useState([0, 0]);

  // Force all meshes in the scene to be white
  useEffect(() => {
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        // Ensure the model is white and set a white MeshStandardMaterial
        obj.material = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          roughness: 0.5,
          metalness: 0,
        });
      }
    });

    if (animations.length > 0) {
      mixerRef.current = new THREE.AnimationMixer(scene);
      animations.forEach((clip) => {
        const action = mixerRef.current.clipAction(clip);
        action.play();
      });
    }
  }, [scene, animations]);

  // Scroll event to rotate the model based on wheel scroll
  useEffect(() => {
    const handleWheel = (event) => {
      setRotationIndex((prev) => {
        let newIndex = prev + (event.deltaY > 0 ? 1 : -1);
        newIndex = (newIndex + 6) % 6; // Keep index in range 0-5
        setCurrentFace(newIndex);
        return newIndex;
      });
    };
    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [setCurrentFace]);

  // Animate the model and apply rotation based on index
  useFrame((_, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
    if (modelRef.current) {
      const angle = (rotationIndex * Math.PI) / 2;
      modelRef.current.rotation.y = angle;
    }
  });

  // Handle mouse down and drag
  const handlePointerDown = (e) => {
    setStartDrag([e.clientX, e.clientY]);
    setDragging(true);
  };

  const handlePointerMove = (e) => {
    if (dragging) {
      const deltaX = e.clientX - startDrag[0];
      const deltaY = e.clientY - startDrag[1];

      const rotationDelta = deltaX * 0.002; // Sensitivity for the horizontal rotation
      setDrag([rotationDelta, 0]);
      setStartDrag([e.clientX, e.clientY]);

      setDragPosition(rotationDelta); // Update the drag position for text movement
    }
  };

  const handlePointerUp = () => {
    setDragging(false);
  };

  return (
    <primitive
      object={scene}
      ref={modelRef}
      scale={3.5}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    />
  );
};

export default function CarSceneTwo() {
  const [currentFace, setCurrentFace] = useState(0);
  const [textPosition, setTextPosition] = useState("100%");
  const [dragPosition, setDragPosition] = useState(0);

  useEffect(() => {
    setTextPosition("-100%"); // Move text out first
    setTimeout(() => setTextPosition("0%"), 100); // Bring it into view
  }, [currentFace]);

  return (
    <Box display="flex" flexDir="column" alignItems="center">
      <Canvas camera={{ position: [0, 2, 6], fov: 75 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[2, 5, 2]} intensity={2} />
        <CarModel
          setCurrentFace={setCurrentFace}
          setDragPosition={setDragPosition}
          rotationIndex={currentFace}
        />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
      <Box
        mt={4}
        overflow="hidden"
        position="relative"
        w="100%"
        textAlign="center"
      >
        <motion.div
          style={{
            position: "relative",
            left: `${textPosition}%`,
          }}
          animate={{ left: `${dragPosition * 100}%` }} // Sync text with model drag
          transition={{ type: "spring", stiffness: 100 }}
        >
          <Text
            fontSize="2xl"
            fontWeight="bold"
            transition="left 0.3s ease-out"
          >
            {faceTexts[currentFace]}
          </Text>
        </motion.div>
      </Box>
    </Box>
  );
}
