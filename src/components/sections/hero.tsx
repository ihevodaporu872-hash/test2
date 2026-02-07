"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import {
  fadeInUp,
  staggerContainerWithDelay,
  defaultTransition,
} from "@/lib/animations";
import { Button } from "@/components/ui/button";

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  trustHints?: string[];
  className?: string;
}

export function Hero({
  title,
  subtitle,
  backgroundImage,
  primaryCta,
  secondaryCta,
  trustHints = [],
  className,
}: HeroProps) {
  return (
    <section
      className={cn(
        "relative flex items-center justify-center min-h-screen overflow-hidden",
        className
      )}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainerWithDelay(0.15, 0.3)}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32"
      >
        <motion.h1
          variants={fadeInUp}
          transition={{ ...defaultTransition, duration: 1 }}
          className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white"
        >
          {title}
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          transition={{ ...defaultTransition, duration: 0.8 }}
          className="mt-6 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-white/80"
        >
          {subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeInUp}
          transition={{ ...defaultTransition, duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button asChild size="lg" className="min-w-[200px]">
            <Link href={primaryCta.href}>{primaryCta.label}</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="min-w-[200px] border-white/30 text-white hover:bg-white/10 hover:text-white"
          >
            <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
          </Button>
        </motion.div>

        {/* Trust hints */}
        {trustHints.length > 0 && (
          <motion.div
            variants={fadeInUp}
            transition={{ ...defaultTransition, duration: 0.8 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          >
            {trustHints.map((hint, index) => (
              <span
                key={index}
                className="text-sm text-white/60 tracking-wide"
              >
                {hint}
              </span>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
