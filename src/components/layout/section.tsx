"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

import { cn } from "@/lib/utils"
import { fadeInUp, defaultTransition } from "@/lib/animations"

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  withPadding?: boolean
  withContainer?: boolean
}

export function Section({
  children,
  className,
  id,
  withPadding = true,
  withContainer = true,
}: SectionProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "-50px 0px",
  })

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{ ...defaultTransition, duration: 0.8 }}
      className={cn(
        withPadding && "py-20 md:py-32",
        className
      )}
    >
      {withContainer ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      ) : (
        children
      )}
    </motion.section>
  )
}
