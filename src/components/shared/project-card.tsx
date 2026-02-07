"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { fadeInUp, defaultTransition } from "@/lib/animations"
import type { Project } from "@/types"

interface ProjectCardProps {
  project: Project
  className?: string
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      transition={defaultTransition}
      className={cn("group relative", className)}
    >
      <Link href={`/portfolio/${project.slug}`} className="block">
        {/* Image container with aspect ratio */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={cn(
              "object-cover transition-transform duration-700 ease-out",
              "group-hover:scale-110"
            )}
          />

          {/* Hover overlay */}
          <div
            className={cn(
              "absolute inset-0 flex flex-col items-center justify-center",
              "bg-black/0 group-hover:bg-black/50",
              "transition-all duration-500 ease-out"
            )}
          >
            <motion.div
              initial={false}
              className={cn(
                "text-center px-6 translate-y-4 opacity-0",
                "group-hover:translate-y-0 group-hover:opacity-100",
                "transition-all duration-500 ease-out delay-100"
              )}
            >
              <p className="text-white/70 text-sm uppercase tracking-wider mb-2">
                {project.category}
              </p>
              <h3 className="text-white text-xl md:text-2xl font-heading font-semibold">
                {project.title}
              </h3>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
