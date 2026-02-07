"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Maximize2, Calendar, Layers } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";

import { cn } from "@/lib/utils";
import {
  fadeInUp,
  staggerContainer,
  defaultTransition,
} from "@/lib/animations";
import { Section } from "@/components/layout/section";
import { BeforeAfterSlider } from "@/components/shared/before-after-slider";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types";

const categoryLabels: Record<Project["category"], string> = {
  residential: "Жилой",
  commercial: "Коммерческий",
  hospitality: "Гостиничный",
  office: "Офисный",
};

interface ProjectDetailContentProps {
  project: Project;
}

export function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const lightboxSlides = project.images.map((src) => ({ src }));

  return (
    <>
      {/* Hero section with cover image */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${project.coverImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20 w-full"
        >
          <motion.div variants={fadeInUp} transition={defaultTransition}>
            <Badge
              variant="secondary"
              className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm"
            >
              {categoryLabels[project.category]}
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            transition={defaultTransition}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            {project.title}
          </motion.h1>

          <motion.div
            variants={fadeInUp}
            transition={defaultTransition}
            className="flex flex-wrap gap-6 text-white/80"
          >
            <div className="flex items-center gap-2">
              <MapPin className="size-4" />
              <span className="text-sm">{project.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Maximize2 className="size-4" />
              <span className="text-sm">{project.area}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="size-4" />
              <span className="text-sm">{project.year}</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Description */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
            О проекте
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>
      </Section>

      {/* Image Gallery */}
      <Section className="bg-muted/30">
        <div className="text-center mb-12">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Галерея проекта
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {project.images.map((image, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              transition={defaultTransition}
              className={cn(
                "relative overflow-hidden rounded-lg cursor-pointer group",
                index === 0 && "md:col-span-2 aspect-video",
                index > 0 && "aspect-[4/3]"
              )}
              onClick={() => {
                setLightboxIndex(index);
                setLightboxOpen(true);
              }}
            >
              <Image
                src={image}
                alt={`${project.title} — фото ${index + 1}`}
                fill
                sizes={
                  index === 0
                    ? "(max-width: 768px) 100vw, 100vw"
                    : "(max-width: 768px) 100vw, 50vw"
                }
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <Maximize2 className="size-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox */}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={lightboxSlides}
        />
      </Section>

      {/* Before/After */}
      {project.beforeImage && project.afterImage && (
        <Section>
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              До и после
            </h2>
            <p className="mt-4 text-muted-foreground">
              Двигайте ползунок, чтобы увидеть трансформацию
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <BeforeAfterSlider
              beforeImage={project.beforeImage}
              afterImage={project.afterImage}
              beforeLabel="До"
              afterLabel="После"
            />
          </div>
        </Section>
      )}

      {/* Scope */}
      <Section className={project.beforeImage ? "bg-muted/30" : ""}>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="inline-flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary">
              <Layers className="size-5" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              Что было сделано
            </h2>
          </div>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {project.scope.map((item) => (
              <motion.li
                key={item}
                variants={fadeInUp}
                transition={defaultTransition}
                className="flex items-center gap-3 p-4 rounded-lg bg-background border border-border/50"
              >
                <div className="size-2 rounded-full bg-primary shrink-0" />
                <span className="text-foreground">{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Section>
    </>
  );
}
