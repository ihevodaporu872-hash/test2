"use client"

import { motion } from "framer-motion"
import {
  Paintbrush,
  Home,
  Building2,
  ClipboardList,
  Lightbulb,
  Ruler,
  Palette,
  Sofa,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { fadeInUp, defaultTransition } from "@/lib/animations"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import type { Service } from "@/types"

// Map icon names to lucide components
const iconMap: Record<string, LucideIcon> = {
  paintbrush: Paintbrush,
  home: Home,
  building: Building2,
  clipboard: ClipboardList,
  lightbulb: Lightbulb,
  ruler: Ruler,
  palette: Palette,
  sofa: Sofa,
}

interface ServiceCardProps {
  service: Service
  className?: string
}

export function ServiceCard({ service, className }: ServiceCardProps) {
  const Icon = iconMap[service.icon] ?? Paintbrush

  return (
    <motion.div
      variants={fadeInUp}
      transition={defaultTransition}
    >
      <Card
        className={cn(
          "h-full group transition-all duration-300",
          "hover:shadow-lg hover:-translate-y-1",
          className
        )}
      >
        <CardHeader>
          {/* Icon */}
          <div className="mb-2">
            <div
              className={cn(
                "inline-flex items-center justify-center",
                "size-12 rounded-lg",
                "bg-muted text-foreground",
                "group-hover:bg-primary group-hover:text-primary-foreground",
                "transition-colors duration-300"
              )}
            >
              <Icon className="size-6" />
            </div>
          </div>

          <CardTitle className="text-lg">{service.title}</CardTitle>
          <CardDescription className="leading-relaxed">
            {service.description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Feature list */}
          {service.features.length > 0 && (
            <ul className="space-y-2">
              {service.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
