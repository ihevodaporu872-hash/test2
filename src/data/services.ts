import { Service } from '@/types';

export const services: Service[] = [
  {
    id: '1',
    title: 'Residential Design',
    description:
      'Transform your home into a personalized sanctuary. We craft living spaces that reflect your lifestyle, combining aesthetic beauty with everyday functionality to create environments where life unfolds naturally.',
    icon: 'Home',
    features: [
      'Full home interior design',
      'Space planning and layout optimization',
      'Custom furniture design and sourcing',
      'Material and finish selection',
      'Color palette development',
      'Lighting design and specification',
      'Art curation and styling',
      'Kitchen and bathroom design',
    ],
  },
  {
    id: '2',
    title: 'Commercial Design',
    description:
      'Create impactful commercial spaces that elevate your brand and engage your audience. From retail environments to restaurants, we design spaces that drive business objectives while delivering memorable experiences.',
    icon: 'Building2',
    features: [
      'Retail and hospitality interiors',
      'Restaurant and bar design',
      'Brand-aligned spatial design',
      'Customer journey mapping',
      'Display and merchandising design',
      'Signage and wayfinding integration',
      'Compliance and accessibility planning',
      'Sustainable material specification',
    ],
  },
  {
    id: '3',
    title: 'Design Consultation',
    description:
      'Get expert guidance for your design vision. Whether you need direction on a single room or a comprehensive design roadmap, our consultation service provides tailored advice to bring clarity to your project.',
    icon: 'MessageSquare',
    features: [
      'Initial design assessment',
      'Style direction and mood boarding',
      'Space planning recommendations',
      'Budget planning and allocation',
      'Contractor and vendor referrals',
      'Design concept presentation',
      'Material and color guidance',
      'Virtual consultation options',
    ],
  },
  {
    id: '4',
    title: 'Project Management',
    description:
      'Seamless execution from concept to completion. Our dedicated project management ensures every detail is handled with precision, keeping your project on time, on budget, and exceeding expectations.',
    icon: 'ClipboardList',
    features: [
      'End-to-end project coordination',
      'Contractor selection and management',
      'Budget tracking and reporting',
      'Timeline development and oversight',
      'Quality control inspections',
      'Vendor and supplier management',
      'On-site supervision',
      'Post-completion support and styling',
    ],
  },
];

export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}
