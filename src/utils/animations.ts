export const EASE_CINEMATIC = [0.16, 1, 0.3, 1]; // Premium cubic-bezier transition

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: EASE_CINEMATIC,
    },
  },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: EASE_CINEMATIC,
    },
  },
};

export const fadeUpStagger = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: EASE_CINEMATIC,
    },
  },
};

export const containerStagger = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const textReveal = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: EASE_CINEMATIC,
    },
  },
};

export const scaleReveal = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.4,
      ease: EASE_CINEMATIC,
    },
  },
};
