import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
function AnimatedCube({ glbUrl }) {
  const [model, setModel] = useState(null);
  const meshRef = useRef();

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(glbUrl, (gltf) => {
      setModel(gltf.scene);
    });
  }, [glbUrl]);

  useFrame(() => {
    if (meshRef.current) {
      // Apply rotation or other animations here based on scroll
    }
  });

  return model ? (
    <primitive object={model} ref={meshRef} />
  ) : (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}
export default AnimatedCube;
