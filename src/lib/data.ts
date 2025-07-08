import { type LucideIcon, Sparkles, Wrench, Zap, PaintRoller, Bug } from 'lucide-react';

export interface Service {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  details: string;
  subServices: string[];
  image: string;
  dataAiHint: string;
}

export const services: Service[] = [
  {
    slug: 'painting',
    title: 'Painting Work',
    description: 'Professional interior and exterior painting services to give your property a fresh new look.',
    icon: PaintRoller,
    details: 'Transform your space with our professional painting services. We use high-quality paints and materials for a durable and beautiful finish. Our team ensures clean work with proper surface preparation and post-painting cleanup.',
    subServices: [
        'Full Wall Painting – Studio',
        'Full Wall Painting – 1BHK',
        'Full Wall Painting – 2BHK',
        'Touch-Up Painting – Studio',
        'Touch-Up Painting – 1BHK',
        'Touch-Up Painting – 2BHK',
        'Painting Table or Chair',
    ],
    image: 'https://placehold.co/1200x600.png',
    dataAiHint: 'wall painting',
  },
  {
    slug: 'electrical-repair',
    title: 'Electrical Work',
    description: 'Safe and reliable electrical services, from minor repairs to complete wiring solutions.',
    icon: Zap,
    details: 'Our certified electricians handle all types of electrical work, including fixing short circuits, installing new light fixtures, socket replacements, and comprehensive electrical safety checks for your home or office.',
    subServices: [
        'Replacement of Balcony Door Lock Set',
        'Supply and Replacement of Spot Light',
        'Supply and Installation of 8" LED Light',
        'Supply and Installation of Light Bulb',
        'Chandelier Installation',
        'Repair of Chair, Balcony Door, or Toilet Cover',
        'Wood Door Repair',
        'Supply and Installation of Fly Mesh',
        'Installation of Single Socket / Power Plug',
        'Just Visit (Inspection or consultation only)',
    ],
    image: 'https://placehold.co/1200x600.png',
    dataAiHint: 'electrical repair',
  },
  {
    slug: 'plumbing',
    title: 'Plumbing',
    description: 'Comprehensive plumbing solutions for leaks, blockages, installations, and emergency repairs.',
    icon: Wrench,
    details: 'From leaky faucets to major pipe bursts, our skilled plumbers are available 24/7. We offer pipe repair, drain cleaning, water heater installation, and bathroom/kitchen fixture installation services.',
    subServices: [
        'Supply and Replacement of House Pipe',
        'Water Heater Replacement',
        'Toilet Seat Block Work',
        'Sink or Wash Basin Block Work',
        'Supply and Installation of Angle Valve',
        'Silicone Work',
        'Replacement of Hand Spray',
        'Replacement of Full Shower Set',
        'Replacement of Shower Head or Pipe',
    ],
    image: 'https://placehold.co/1200x600.png',
    dataAiHint: 'plumbing work',
  },
  {
    slug: 'cleaning-services',
    title: 'Cleaning Services',
    description: 'Thorough cleaning services for homes and offices, leaving your space spotless and fresh.',
    icon: Sparkles,
    details: 'Our cleaning service covers every nook and cranny of your property. We use eco-friendly products and professional equipment to ensure a healthy environment.',
    subServices: [
        'Normal Cleaning – Studio',
        'Normal Cleaning – 1BHK',
        'Normal Cleaning – 2BHK',
        'Hourly Cleaning (1 Hour)',
    ],
    image: 'https://placehold.co/1200x600.png',
    dataAiHint: 'deep cleaning',
  },
  {
    slug: 'pest-control',
    title: 'Pest Control',
    description: 'Effective and safe pest control solutions to protect your home from unwanted intruders.',
    icon: Bug,
    details: 'We provide comprehensive pest control services for common pests in Dubai like cockroaches, ants, bed bugs, and rodents. Our treatments are safe for your family and pets, ensuring a pest-free environment.',
    subServices: [],
    image: 'https://placehold.co/1200x600.png',
    dataAiHint: 'pest control',
  }
];
