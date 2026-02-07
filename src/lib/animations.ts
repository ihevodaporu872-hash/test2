import type { Variants, Transition } from "framer-motion"

// Fade in from bottom
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
}

// Fade in from top
export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -30,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
}

// Fade in from left
export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
}

// Fade in from right
export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
}

// Simple fade in
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
}

// Scale up
export const scaleUp: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
}

// Stagger children container
export const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

// Stagger children with custom delay
export function staggerContainerWithDelay(
  stagger: number = 0.1,
  delay: number = 0
): Variants {
  return {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }
}

// Word reveal for text animations
export const wordReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
}

// Default transition
export const defaultTransition: Transition = {
  duration: 0.6,
  ease: [0.25, 0.1, 0.25, 1],
}

// Smooth transition
export const smoothTransition: Transition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1],
}

// Spring transition
export const springTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
}

// Hover scale effect
export const hoverScale = {
  scale: 1.02,
  transition: { duration: 0.3, ease: "easeOut" as const },
}

// Tap scale effect
export const tapScale = {
  scale: 0.98,
}
