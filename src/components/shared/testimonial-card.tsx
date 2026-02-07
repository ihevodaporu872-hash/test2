"use client"

import { Quote, Star } from "lucide-react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { fadeInUp, defaultTransition } from "@/lib/animations"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import type { Testimonial } from "@/types"

interface TestimonialCardProps {
  testimonial: Testimonial
  className?: string
}

export function TestimonialCard({
  testimonial,
  className,
}: TestimonialCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      transition={defaultTransition}
    >
      <Card className={cn("h-full", className)}>
        <CardHeader className="pb-0">
          {/* Quote icon */}
          <Quote aria-hidden="true" className="size-8 text-muted-foreground/30" />

          {/* Star rating */}
          <div className="flex items-center gap-1 mt-3" role="img" aria-label={`Оценка: ${testimonial.rating} из 5`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                aria-hidden="true"
                className={cn(
                  "size-4",
                  i < testimonial.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-muted text-muted"
                )}
              />
            ))}
          </div>
        </CardHeader>

        <CardContent className="flex flex-col justify-between flex-1">
          {/* Content */}
          <p className="text-muted-foreground leading-relaxed text-sm">
            &ldquo;{testimonial.content}&rdquo;
          </p>

          {/* Author */}
          <div className="mt-6 pt-4 border-t border-border">
            <p className="font-semibold text-sm text-foreground">
              {testimonial.author}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {testimonial.role}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
