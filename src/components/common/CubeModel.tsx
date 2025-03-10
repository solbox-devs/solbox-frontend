"use client";
import modelUrl from "@/assets/models/output.glb";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
interface CubeModelProps {
  setDisplayedText: (text: string) => void;
  setBgGradient: (color: string) => void;
  gradientColors: string[];
  sentences: string[];
}

const CubeModel: React.FC<CubeModelProps> = ({
  setDisplayedText,
  setBgGradient,
  gradientColors,
  sentences,
}) => {
  // const { scene, animations } = useGLTF("/models/output.glb");
  const { scene, animations } = useGLTF(modelUrl); // This will now be loaded only on the client
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

    mixerRef.current?.update(delta * 0.85);

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
  ) : null;
};
export default CubeModel;
