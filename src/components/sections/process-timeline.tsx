"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer, defaultTransition } from "@/lib/animations";
import { Section } from "@/components/layout/section";

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  duration?: string;
}

interface ProcessTimelineProps {
  title: string;
  description?: string;
  steps: ProcessStep[];
  className?: string;
}

export function ProcessTimeline({
  title,
  description,
  steps,
  className,
}: ProcessTimelineProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Section className={className}>
      <div className="text-center mb-12 md:mb-16">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>

      <div ref={ref} className="relative max-w-3xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="space-y-12"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={fadeInUp}
              transition={defaultTransition}
              className={cn(
                "relative flex items-start gap-6 md:gap-12",
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              )}
            >
              {/* Step number circle */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                <div className="flex items-center justify-center size-12 rounded-full bg-primary text-primary-foreground font-bold text-sm border-4 border-background">
                  {step.number}
                </div>
              </div>

              {/* Content */}
              <div
                className={cn(
                  "ml-20 md:ml-0 md:w-[calc(50%-3rem)]",
                  index % 2 === 0 ? "md:text-right md:pr-0" : "md:text-left md:pl-0"
                )}
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                {step.duration && (
                  <p className="mt-2 text-xs text-primary font-medium">
                    {step.duration}
                  </p>
                )}
              </div>

              {/* Spacer for the other side */}
              <div className="hidden md:block md:w-[calc(50%-3rem)]" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
