"use client"

import Masonry from "react-masonry-css"

import { cn } from "@/lib/utils"

interface MasonryGridProps {
  children: React.ReactNode
  columns?: Record<string | number, number>
  className?: string
  gapClassName?: string
}

const defaultBreakpoints: Record<string | number, number> = {
  default: 3,
  768: 2,
  480: 1,
}

export function MasonryGrid({
  children,
  columns = defaultBreakpoints,
  className,
  gapClassName,
}: MasonryGridProps) {
  return (
    <Masonry
      breakpointCols={columns}
      className={cn("flex -ml-6 w-auto", className)}
      columnClassName={cn("pl-6 bg-clip-padding", gapClassName)}
    >
      {children}
    </Masonry>
  )
}
