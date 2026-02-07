export interface NavItem {
  title: string
  href: string
  description?: string
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export interface Project {
  id: string
  slug: string
  title: string
  category: string
  description: string
  image: string
  images?: string[]
  year?: string
  location?: string
  area?: string
  client?: string
  featured?: boolean
}

export interface Testimonial {
  id: string
  content: string
  author: string
  role: string
  company?: string
  avatar?: string
  rating: number
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  image?: string
  slug?: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  avatar: string
  socials?: {
    instagram?: string
    linkedin?: string
    twitter?: string
  }
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  date: string
  category: string
  tags?: string[]
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  service?: string
  message: string
}
