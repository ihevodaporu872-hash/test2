"use client"

import Link from "next/link"
import { Instagram, Linkedin, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

import { cn } from "@/lib/utils"
import { footerNavigation } from "@/config/navigation"
import { fadeInUp, staggerContainer, defaultTransition } from "@/lib/animations"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

// Pinterest icon is not available in lucide-react, create a simple SVG component
function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="12" y1="17" x2="12" y2="22" />
      <path d="M8 22l2-5" />
      <path d="M16.5 7.5a4.5 4.5 0 1 0-5.7 6.3L12 17l1.2-3.2a4.5 4.5 0 0 0 3.3-6.3z" />
    </svg>
  )
}

export function Footer() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const currentYear = new Date().getFullYear()

  return (
    <footer
      ref={ref}
      className="bg-muted/30 border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          transition={defaultTransition}
          className="py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12"
        >
          {/* Logo and tagline */}
          <motion.div
            variants={fadeInUp}
            transition={defaultTransition}
            className="lg:col-span-4"
          >
            <Link
              href="/"
              className="font-heading text-xl tracking-[0.2em] uppercase font-semibold text-foreground"
            >
              Interior Studio
            </Link>
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed max-w-xs">
              Creating timeless interiors that blend elegance with functionality.
              Every space tells a story — let us help you tell yours.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="size-5" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                aria-label="Pinterest"
              >
                <PinterestIcon className="size-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-5" />
              </a>
            </div>
          </motion.div>

          {/* Navigation columns */}
          {footerNavigation.map((section) => (
            <motion.div
              key={section.title}
              variants={fadeInUp}
              transition={defaultTransition}
              className="lg:col-span-2"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ ...defaultTransition, delay: 0.3 }}
          className="py-8 border-t border-border"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Subscribe to our newsletter
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Get design inspiration and project updates delivered to your inbox.
              </p>
            </div>
            <form
              className="flex w-full sm:w-auto gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-64"
                aria-label="Email address"
              />
              <Button type="submit" size="default">
                <ArrowRight className="size-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
          </div>
        </motion.div>

        <Separator />

        {/* Copyright */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} Interior Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
