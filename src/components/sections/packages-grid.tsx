"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer, defaultTransition } from "@/lib/animations";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface PackageItem {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  priceNote?: string;
  duration: string;
  includes: string[];
  excludes?: string[];
  cta: string;
  featured?: boolean;
}

interface PackagesGridProps {
  title: string;
  description?: string;
  packages: PackageItem[];
  ctaHref?: string;
  className?: string;
}

export function PackagesGrid({
  title,
  description,
  packages,
  ctaHref = "/contact",
  className,
}: PackagesGridProps) {
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

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {packages.map((pkg) => (
          <motion.div
            key={pkg.id}
            variants={fadeInUp}
            transition={defaultTransition}
          >
            <Card
              className={cn(
                "h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
                pkg.featured && "border-primary ring-1 ring-primary/20"
              )}
            >
              <CardHeader>
                {pkg.featured && (
                  <Badge variant="default" className="w-fit mb-2">
                    Популярный
                  </Badge>
                )}
                <CardTitle className="text-lg">{pkg.title}</CardTitle>
                <CardDescription>{pkg.subtitle}</CardDescription>
                <div className="pt-2">
                  <span className="text-2xl font-bold text-foreground">
                    {pkg.price}
                  </span>
                  {pkg.priceNote && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {pkg.priceNote}
                    </p>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Срок: {pkg.duration}
                </p>
              </CardHeader>

              <CardContent className="flex-1">
                <ul className="space-y-2">
                  {pkg.includes.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="size-4 text-green-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                  {pkg.excludes?.map((item, i) => (
                    <li
                      key={`ex-${i}`}
                      className="flex items-start gap-2 text-sm text-muted-foreground/60"
                    >
                      <X className="size-4 text-red-400 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button asChild className="w-full" variant={pkg.featured ? "default" : "outline"}>
                  <Link href={ctaHref}>{pkg.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
