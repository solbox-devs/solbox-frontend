// "use client";

// import { OrbitControls } from "@react-three/drei";
// import { Canvas, useLoader } from "@react-three/fiber";
// import { useScroll, useSpring, useTransform } from "framer-motion";
// import { motion } from "framer-motion-3d";
// import React, { useRef } from "react";
// import { AmbientLight, DirectionalLight, Mesh, TextureLoader } from "three";
// import styles from "./style.module.scss";

// // Type for Cube Props
// interface CubeProps {
//   progress: number;
// }

// const CubeScrollAnimation: React.FC = () => {
//   const containerRef = useRef<HTMLDivElement>(null);

//   // Scroll Animation
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   });

//   const progress = useTransform(scrollYProgress, [0, 1], [0, 5]);
//   const smoothProgress = useSpring(progress, { damping: 20 });

//   return (
//     <div ref={containerRef} className={styles.main}>
//       <div className={styles.cube}>
//         <Canvas>
//           <OrbitControls enableZoom={false} enablePan={false} />
//           <primitive object={new AmbientLight(0xffffff, 2)} />
//           <primitive
//             object={new DirectionalLight(0xffffff, 1)}
//             position={[2, 1, 1]}
//           />
//           <Cube progress={smoothProgress} />
//         </Canvas>
//       </div>
//     </div>
//   );
// };

// const Cube: React.FC<CubeProps> = ({ progress }) => {
//   const meshRef = useRef<Mesh>(null);

//   // Load Textures
//   const textures = useLoader(TextureLoader, [
//     "/assets/1.jpg",
//     "/assets/2.jpg",
//     "/assets/3.jpg",
//     "/assets/4.jpg",
//     "/assets/5.jpg",
//     "/assets/6.jpg",
//   ]);

//   return (
//     <motion.mesh
//       ref={meshRef}
//       rotation-y={progress as any}
//       rotation-x={progress as any}
//     >
//       <boxGeometry args={[2.5, 2.5, 2.5]} />
//       {textures.map((texture, index) => (
//         <meshStandardMaterial
//           key={index}
//           map={texture}
//           attach={`material-${index}`}
//         />
//       ))}
//     </motion.mesh>
//   );
// };

// export default CubeScrollAnimation;
