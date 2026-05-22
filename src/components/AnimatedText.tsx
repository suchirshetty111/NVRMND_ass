import { motion } from "motion/react";
import { EASE_CINEMATIC } from "../utils/animations";

interface AnimatedTextProps {
  text: string;
  delay?: number;
  className?: string;
  variant?: "slideUp" | "reveal" | "blurIn";
  staggerChildren?: number;
}

export default function AnimatedText({
  text,
  delay = 0,
  className = "",
  variant = "slideUp",
  staggerChildren = 0.05,
}: AnimatedTextProps) {
  const words = text.split(" ");

  // Slide up variant where words mask-reveal up
  if (variant === "slideUp") {
    const container = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: staggerChildren,
          delayChildren: delay,
        },
      },
    };

    const child = {
      hidden: { y: "110%", opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.8,
          ease: EASE_CINEMATIC,
        },
      },
    };

    return (
      <motion.span
        variants={container}
        initial="hidden"
        animate="visible"
        className={`inline-flex flex-wrap overflow-hidden ${className}`}
      >
        {words.map((word, index) => (
          <span key={index} className="inline-block overflow-hidden mr-[0.25em] py-[0.1em]">
            <motion.span variants={child} className="inline-block">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    );
  }

  // Soft blur-scale reveal variant
  if (variant === "blurIn") {
    return (
      <motion.span
        initial={{ opacity: 0, filter: "blur(20px)", scale: 0.94 }}
        animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
        transition={{
          duration: 1.2,
          delay,
          ease: EASE_CINEMATIC,
        }}
        className={`inline-block ${className}`}
      >
        {text}
      </motion.span>
    );
  }

  return (
    <span className={className}>{text}</span>
  );
}
