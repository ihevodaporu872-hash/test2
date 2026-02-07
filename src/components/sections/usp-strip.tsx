"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Clock,
  Shield,
  Sparkles,
  Users,
  Award,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer, defaultTransition } from "@/lib/animations";

const iconMap: Record<string, LucideIcon> = {
  clock: Clock,
  shield: Shield,
  sparkles: Sparkles,
  users: Users,
  award: Award,
};

export interface USPItem {
  icon: string;
  title: string;
  description: string;
}

interface USPStripProps {
  items: USPItem[];
  className?: string;
}

export function USPStrip({ items, className }: USPStripProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      ref={ref}
      className={cn("py-12 md:py-16 bg-muted/30 border-y border-border", className)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8"
        >
          {items.map((item, index) => {
            const Icon = iconMap[item.icon] ?? Sparkles;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={defaultTransition}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="inline-flex items-center justify-center size-12 rounded-full bg-primary/10 text-primary">
                  <Icon className="size-6" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
