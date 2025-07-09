import { type LucideIcon, Sparkles, Wrench, Zap, PaintRoller, Bug } from 'lucide-react';

export interface Service {
  slug: string;
  titleKey: `${string}.title`;
  descriptionKey: `${string}.description`;
  icon: LucideIcon;
  detailsKey: `${string}.details`;
  subServiceKeys: `${string}.subServices.${string}`[];
  image: string;
  dataAiHint: string;
}

export const services: Service[] = [
  {
    slug: 'painting',
    titleKey: 'painting.title',
    descriptionKey: 'painting.description',
    icon: PaintRoller,
    detailsKey: 'painting.details',
    subServiceKeys: [
        'painting.subServices.full_studio',
        'painting.subServices.full_1bhk',
        'painting.subServices.full_2bhk',
        'painting.subServices.touchup_studio',
        'painting.subServices.touchup_1bhk',
        'painting.subServices.touchup_2bhk',
        'painting.subServices.table_chair',
    ],
    image: 'https://placehold.co/1200x600.png',
    dataAiHint: 'wall painting',
  },
  {
    slug: 'electrical-repair',
    titleKey: 'electrical.title',
    descriptionKey: 'electrical.description',
    icon: Zap,
    detailsKey: 'electrical.details',
    subServiceKeys: [
        'electrical.subServices.balcony_lock',
        'electrical.subServices.spot_light',
        'electrical.subServices.led_light',
        'electrical.subServices.light_bulb',
        'electrical.subServices.chandelier',
        'electrical.subServices.chair_repair',
        'electrical.subServices.wood_door',
        'electrical.subServices.fly_mesh',
        'electrical.subServices.socket_plug',
        'electrical.subServices.visit_only',
    ],
    image: 'https://placehold.co/1200x600.png',
    dataAiHint: 'electrical repair',
  },
  {
    slug: 'plumbing',
    titleKey: 'plumbing.title',
    descriptionKey: 'plumbing.description',
    icon: Wrench,
    detailsKey: 'plumbing.details',
    subServiceKeys: [
        'plumbing.subServices.house_pipe',
        'plumbing.subServices.water_heater',
        'plumbing.subServices.toilet_block',
        'plumbing.subServices.sink_block',
        'plumbing.subServices.angle_valve',
        'plumbing.subServices.silicone',
        'plumbing.subServices.hand_spray',
        'plumbing.subServices.shower_set',
        'plumbing.subServices.shower_head',
    ],
    image: 'https://placehold.co/1200x600.png',
    dataAiHint: 'plumbing work',
  },
  {
    slug: 'cleaning-services',
    titleKey: 'cleaning.title',
    descriptionKey: 'cleaning.description',
    icon: Sparkles,
    detailsKey: 'cleaning.details',
    subServiceKeys: [
        'cleaning.subServices.normal_studio',
        'cleaning.subServices.normal_1bhk',
        'cleaning.subServices.normal_2bhk',
        'cleaning.subServices.hourly',
    ],
    image: 'https://placehold.co/1200x600.png',
    dataAiHint: 'deep cleaning',
  },
  {
    slug: 'pest-control',
    titleKey: 'pest_control.title',
    descriptionKey: 'pest_control.description',
    icon: Bug,
    detailsKey: 'pest_control.details',
    subServiceKeys: [],
    image: 'https://placehold.co/1200x600.png',
    dataAiHint: 'pest control',
  }
];
