"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { staggerContainer } from "@/lib/animations";
import { Section } from "@/components/layout/section";
import { MasonryGrid } from "@/components/shared/masonry-grid";
import { ProjectCard } from "@/components/shared/project-card";
import type { Project } from "@/types";

interface ProjectsGalleryProps {
  title: string;
  description?: string;
  projects: Project[];
  columns?: Record<string | number, number>;
  className?: string;
}

export function ProjectsGallery({
  title,
  description,
  projects,
  columns,
  className,
}: ProjectsGalleryProps) {
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
      >
        <MasonryGrid columns={columns}>
          {projects.map((project) => (
            <div key={project.id} className={cn("mb-6")}>
              <ProjectCard project={project} />
            </div>
          ))}
        </MasonryGrid>
      </motion.div>
    </Section>
  );
}
