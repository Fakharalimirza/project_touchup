import { type LucideIcon, Sparkles, AirVent, Wrench, Zap, PaintRoller, Bug } from 'lucide-react';

export interface Service {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  details: string;
  image: string;
  dataAiHint: string;
}

export const services: Service[] = [
  {
    slug: 'deep-cleaning',
    title: 'Deep Cleaning',
    description: 'Thorough cleaning services for homes and offices, leaving your space spotless and fresh.',
    icon: Sparkles,
    details: 'Our deep cleaning service covers every nook and cranny of your property. We use eco-friendly products and professional equipment to ensure a healthy environment. This service includes kitchen deep cleaning, bathroom sanitization, floor scrubbing, and window cleaning.',
    image: 'https://placehold.co/1200x600.png',
    dataAiHint: 'deep cleaning',
  },
  {
    slug: 'ac-maintenance',
    title: 'AC Maintenance',
    description: 'Expert AC servicing, repair, and installation to keep you cool and comfortable all year round.',
    icon: AirVent,
    details: "Regular AC maintenance is crucial in Dubai's climate. Our services include filter cleaning, coolant level checks, duct cleaning, and performance optimization to ensure your AC runs efficiently and saves energy.",
    image: 'https://placehold.co/1200x600.png',
    dataAiHint: 'ac maintenance',
  },
  {
    slug: 'electrical-repair',
    title: 'Electrical Repair',
    description: 'Safe and reliable electrical services, from minor repairs to complete wiring solutions.',
    icon: Zap,
    details: 'Our certified electricians handle all types of electrical work, including fixing short circuits, installing new light fixtures, socket replacements, and comprehensive electrical safety checks for your home or office.',
    image: 'https://placehold.co/1200x600.png',
    dataAiHint: 'electrical repair',
  },
  {
    slug: 'plumbing',
    title: 'Plumbing',
    description: 'Comprehensive plumbing solutions for leaks, blockages, installations, and emergency repairs.',
    icon: Wrench,
    details: 'From leaky faucets to major pipe bursts, our skilled plumbers are available 24/7. We offer pipe repair, drain cleaning, water heater installation, and bathroom/kitchen fixture installation services.',
    image: 'https://placehold.co/1200x600.png',
    dataAiHint: 'plumbing work',
  },
  {
    slug: 'painting',
    title: 'Painting',
    description: 'Professional interior and exterior painting services to give your property a fresh new look.',
    icon: PaintRoller,
    details: 'Transform your space with our professional painting services. We use high-quality paints and materials for a durable and beautiful finish. Our team ensures clean work with proper surface preparation and post-painting cleanup.',
    image: 'https://placehold.co/1200x600.png',
    dataAiHint: 'wall painting',
  },
  {
    slug: 'pest-control',
    title: 'Pest Control',
    description: 'Effective and safe pest control solutions to protect your home from unwanted intruders.',
    icon: Bug,
    details: 'We provide comprehensive pest control services for common pests in Dubai like cockroaches, ants, bed bugs, and rodents. Our treatments are safe for your family and pets, ensuring a pest-free environment.',
    image: 'https://placehold.co/1200x600.png',
    dataAiHint: 'pest control',
  }
];
