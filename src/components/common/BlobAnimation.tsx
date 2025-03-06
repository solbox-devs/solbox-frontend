import { Box, Spinner } from "@chakra-ui/react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

// ✅ Load 3D Model
const Model = () => {
  const { scene } = useGLTF("/your-model.glb"); // Ensure correct path
  return <primitive object={scene} scale={1.5} />;
};

export default function BlobScene() {
  return (
    <Box w="100vw" h="100vh" position="relative">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={<Spinner />}>
          <Model />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </Box>
  );
}
