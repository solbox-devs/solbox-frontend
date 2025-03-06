import { motion } from "framer-motion";

const scrollTextVariants = {
  left: { x: "-100%" },
  right: { x: "100%" },
  visible: { x: "0%" },
};

function ScrollText({ direction }) {
  return (
    <motion.div
      variants={scrollTextVariants}
      animate={direction}
      initial="left"
      transition={{ type: "spring", stiffness: 100 }}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "2rem",
      }}
    >
      Your Text Here
    </motion.div>
  );
}
export default ScrollText;
