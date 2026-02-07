"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { cn } from "@/lib/utils";
import { trackCtaClick } from "@/lib/analytics";
import { fadeInUp, defaultTransition } from "@/lib/animations";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  title: string;
  description?: string;
  buttonLabel: string;
  buttonHref: string;
  variant?: "default" | "dark" | "primary";
  className?: string;
}

export function CTASection({
  title,
  description,
  buttonLabel,
  buttonHref,
  variant = "default",
  className,
}: CTASectionProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section
      ref={ref}
      className={cn(
        "py-20 md:py-32",
        variant === "dark" && "bg-foreground text-background",
        variant === "primary" && "bg-primary text-primary-foreground",
        variant === "default" && "bg-muted/30",
        className
      )}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ ...defaultTransition, duration: 0.8 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
            {title}
          </h2>
          {description && (
            <p
              className={cn(
                "mt-4 text-lg max-w-2xl mx-auto leading-relaxed",
                variant === "default" && "text-muted-foreground",
                variant === "dark" && "text-background/70",
                variant === "primary" && "text-primary-foreground/80"
              )}
            >
              {description}
            </p>
          )}
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              variant={variant === "default" ? "default" : "outline"}
              className={cn(
                "min-w-[200px]",
                variant === "dark" &&
                  "border-background/30 text-background hover:bg-background/10",
                variant === "primary" &&
                  "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              )}
              onClick={() => trackCtaClick("cta_section", buttonLabel)}
            >
              <Link href={buttonHref}>{buttonLabel}</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
