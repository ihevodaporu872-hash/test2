import type { NavItem, NavSection } from "@/types"

export const mainNavigation: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Portfolio", href: "/portfolio" },
  { title: "Services", href: "/services" },
  { title: "About", href: "/about" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
]

export const footerNavigation: NavSection[] = [
  {
    title: "Company",
    items: [
      { title: "About Us", href: "/about" },
      { title: "Our Team", href: "/about#team" },
      { title: "Careers", href: "/careers" },
      { title: "Press", href: "/press" },
    ],
  },
  {
    title: "Services",
    items: [
      { title: "Residential Design", href: "/services/residential" },
      { title: "Commercial Design", href: "/services/commercial" },
      { title: "Consultation", href: "/services/consultation" },
      { title: "Project Management", href: "/services/project-management" },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Blog", href: "/blog" },
      { title: "Portfolio", href: "/portfolio" },
      { title: "FAQ", href: "/faq" },
      { title: "Contact", href: "/contact" },
    ],
  },
]
