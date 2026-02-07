"use client"

import Link from "next/link"
import { Instagram, Linkedin, ArrowRight, Phone } from "lucide-react"
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

// Map footer navigation section keys to Russian display titles
const sectionTitles: Record<string, string> = {
  services: "Услуги",
  b2b: "Для бизнеса",
  company: "Компания",
  legal: "Юридическое",
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
      role="contentinfo"
      aria-label="Подвал сайта"
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
              Создаём интерьеры, которые работают. Инженерный подход к каждому проекту.
            </p>

            {/* Phone number */}
            <a
              href="tel:+7XXXXXXXXXX"
              className="mt-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <Phone className="size-4" />
              +7 (XXX) XXX-XX-XX
            </a>

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
          {Object.entries(footerNavigation).map(([key, items]) => (
            <motion.div
              key={key}
              variants={fadeInUp}
              transition={defaultTransition}
              className="lg:col-span-2"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
                {sectionTitles[key] || key.charAt(0).toUpperCase() + key.slice(1)}
              </h3>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      {item.label}
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
                Подпишитесь на рассылку
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Вдохновение, кейсы и новости студии — раз в две недели.
              </p>
            </div>
            <form
              className="flex w-full sm:w-auto gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                placeholder="Ваш email"
                className="w-full sm:w-64"
                aria-label="Email адрес"
              />
              <Button type="submit" size="default">
                <ArrowRight className="size-4" />
                <span className="sr-only">Подписаться</span>
              </Button>
            </form>
          </div>
        </motion.div>

        <Separator />

        {/* Copyright */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} Interior Studio. Все права защищены.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Политика конфиденциальности
            </Link>
            <Link
              href="/terms"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Пользовательское соглашение
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
