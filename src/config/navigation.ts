export const mainNavigation = [
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
] as const;

export const footerNavigation = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Team', href: '/about#team' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
  ],
  services: [
    { label: 'Residential Design', href: '/services#residential' },
    { label: 'Commercial Design', href: '/services#commercial' },
    { label: 'Consultation', href: '/services#consultation' },
    { label: 'Project Management', href: '/services#management' },
  ],
  resources: [
    { label: 'Journal', href: '/journal' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
} as const;
