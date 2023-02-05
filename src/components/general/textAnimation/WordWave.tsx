import { motion, Variants, HTMLMotionProps } from "framer-motion";
import { useEffect } from "react";

interface textProps extends HTMLMotionProps<"div"> {
  isArray: boolean;
  wordArray?: String[];
  text?: String;
  delay: number;
  duration: number;
}

const TextAnimation = (props: textProps) => {
  const words = props.isArray ? props.wordArray : props.text?.split(" ");

  const container: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: props.duration,
        delayChildren: i * props.delay,
      },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 30,
      transition: {
        type: "Tween",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.p
      style={{ display: "flex", overflow: "hidden", paddingBottom: "1rem" }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words?.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ display: "inline-block" }}
          //, marginInlineEnd: "1rem"
        >
          {word.concat("\u00A0")}
        </motion.span>
      ))}
    </motion.p>
  );
};

export default TextAnimation;
