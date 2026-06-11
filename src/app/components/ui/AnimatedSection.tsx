"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
}

const directionMap = {
  up:    { hidden: { y: 40,  opacity: 0 }, visible: { y: 0,  opacity: 1 } },
  down:  { hidden: { y: -30, opacity: 0 }, visible: { y: 0,  opacity: 1 } },
  left:  { hidden: { x: 50,  opacity: 0 }, visible: { x: 0,  opacity: 1 } },
  right: { hidden: { x: -50, opacity: 0 }, visible: { x: 0,  opacity: 1 } },
  none:  { hidden: { opacity: 0          }, visible: { opacity: 1         } },
};

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  once = true,
}: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-80px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={directionMap[direction]}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
