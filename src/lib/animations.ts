import { Variants } from "framer-motion";

// Organic easing curves
export const easings = {
  gentle: [0.4, 0.0, 0.2, 1],
  bounce: [0.68, -0.6, 0.32, 1.6],
  smooth: [0.43, 0.13, 0.23, 0.96],
  anticipate: [0.76, 0, 0.24, 1],
};

// Shared animation variants
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: easings.gentle
    }
  }
};

export const breathe: Variants = {
  inhale: {
    scale: 1.02,
    opacity: 1,
    transition: {
      duration: 2,
      ease: easings.gentle,
      repeat: Infinity,
      repeatType: "reverse"
    }
  },
  exhale: {
    scale: 1,
    opacity: 0.9,
    transition: {
      duration: 2,
      ease: easings.gentle,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

export const float: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-2, 2],
    transition: {
      duration: 4,
      ease: easings.smooth,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

export const revealText: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: easings.anticipate
    }
  })
};

export const expandCard: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: easings.smooth
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: easings.bounce
    }
  },
  selected: {
    scale: 1.03,
    transition: {
      duration: 0.3,
      ease: easings.anticipate
    }
  }
};

export const pulseGlow: Variants = {
  initial: {
    boxShadow: "0 0 0 rgba(255,255,255,0)"
  },
  pulse: {
    boxShadow: [
      "0 0 0 rgba(255,255,255,0)",
      "0 0 20px rgba(255,255,255,0.2)",
      "0 0 0 rgba(255,255,255,0)"
    ],
    transition: {
      duration: 2,
      ease: easings.gentle,
      repeat: Infinity
    }
  }
};

// Container variants for staggered children
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Shared transition defaults
export const defaultTransition = {
  type: "spring",
  stiffness: 200,
  damping: 20
};

// Page transition variants
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.7,
      ease: easings.anticipate
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.5,
      ease: easings.gentle
    }
  }
}; 