"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

import { cn } from "@/lib/utils"
import { wordReveal, smoothTransition } from "@/lib/animations"

interface AnimatedTextProps {
  text: string
  tag?: "h1" | "h2" | "h3" | "p"
  className?: string
  delay?: number
}

export function AnimatedText({
  text,
  tag = "p",
  className,
  delay = 0,
}: AnimatedTextProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  const words = text.split(" ")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  }

  const Tag = tag

  return (
    <Tag ref={ref} className={cn("flex flex-wrap", className)}>
      <motion.span
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="flex flex-wrap"
      >
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            variants={wordReveal}
            transition={smoothTransition}
            className="inline-block mr-[0.3em]"
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  )
}
