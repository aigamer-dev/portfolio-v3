// Motion Utilities - Common Framer Motion animations and variants

// Fade animations
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const fadeInDownVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Scale animations
export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Slide animations
export const slideInLeftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const slideInRightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Stagger container for child animations
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Page transition variants
export const pageVariants = {
  initial: { opacity: 0, scale: 0.95 },
  in: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  out: { 
    opacity: 0, 
    scale: 1.05,
    transition: { duration: 0.4, ease: "easeIn" }
  }
};

// Button hover/tap effects
export const buttonHoverVariants = {
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  tap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

// Card hover effects
export const cardHoverVariants = {
  hover: { 
    y: -5,
    scale: 1.02,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

// Loading/spinner animations
export const spinVariants = {
  rotate: {
    rotate: 360,
    transition: { duration: 1, repeat: Infinity, ease: "linear" }
  }
};

// Pulse animation
export const pulseVariants = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  }
};

// Spring configurations for different use cases
export const springConfigs = {
  gentle: { type: "spring", stiffness: 300, damping: 30 },
  bouncy: { type: "spring", stiffness: 500, damping: 25 },
  snappy: { type: "spring", stiffness: 400, damping: 40 },
  slow: { type: "spring", stiffness: 200, damping: 50 }
};

// Easing curves
export const easings = {
  easeInOut: [0.4, 0, 0.2, 1],
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  sharp: [0.4, 0, 0.6, 1],
  smooth: [0.25, 0.46, 0.45, 0.94]
};

// Utility function to create staggered children
export const createStaggerVariants = (staggerDelay = 0.1, childrenDelay = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: childrenDelay
    }
  }
});

// Utility function for entrance animations
export const createEntranceVariant = (direction = 'up', distance = 30) => {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance }
  };

  return {
    hidden: { 
      opacity: 0, 
      ...directions[direction] 
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
};
