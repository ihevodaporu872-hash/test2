"use client"

import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import {
  fadeInUp,
  staggerContainerWithDelay,
  defaultTransition,
} from "@/lib/animations"

interface PageHeaderProps {
  title: string
  description?: string
  backgroundImage?: string
  className?: string
}

export function PageHeader({
  title,
  description,
  backgroundImage,
  className,
}: PageHeaderProps) {
  return (
    <section
      className={cn(
        "relative flex items-center justify-center min-h-[50vh] md:min-h-[60vh] overflow-hidden",
        className
      )}
    >
      {/* Background image with overlay */}
      {backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </>
      )}

      {/* Fallback gradient background when no image */}
      {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background" />
      )}

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainerWithDelay(0.15, 0.2)}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32 md:py-40"
      >
        <motion.h1
          variants={fadeInUp}
          transition={{ ...defaultTransition, duration: 0.8 }}
          className={cn(
            "font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight",
            backgroundImage ? "text-white" : "text-foreground"
          )}
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            variants={fadeInUp}
            transition={{ ...defaultTransition, duration: 0.8 }}
            className={cn(
              "mt-6 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed",
              backgroundImage
                ? "text-white/80"
                : "text-muted-foreground"
            )}
          >
            {description}
          </motion.p>
        )}
      </motion.div>
    </section>
  )
}
