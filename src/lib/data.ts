import { type LucideIcon, Sparkles, Wrench, Zap, PaintRoller, Bug } from 'lucide-react';

export interface Service {
  slug: string;
  titleKey: `Services.${string}.title`;
  descriptionKey: `Services.${string}.description`;
  icon: LucideIcon;
  detailsKey: `Services.${string}.details`;
  subServiceKeys: `Services.${string}.subServices.${string}`[];
  image: string;
  dataAiHint: string;
}

export const services: Service[] = [
  {
    slug: 'painting',
    titleKey: 'Services.painting.title',
    descriptionKey: 'Services.painting.description',
    icon: PaintRoller,
    detailsKey: 'Services.painting.details',
    subServiceKeys: [
        'Services.painting.subServices.full_studio',
        'Services.painting.subServices.full_1bhk',
        'Services.painting.subServices.full_2bhk',
        'Services.painting.subServices.touchup_studio',
        'Services.painting.subServices.touchup_1bhk',
        'Services.painting.subServices.touchup_2bhk',
        'Services.painting.subServices.table_chair',
    ],
    image: 'https://placehold.co/1200x600.png',
    dataAiHint: 'wall painting',
  },
  {
    slug: 'electrical-repair',
    titleKey: 'Services.electrical.title',
    descriptionKey: 'Services.electrical.description',
    icon: Zap,
    detailsKey: 'Services.electrical.details',
    subServiceKeys: [
        'Services.electrical.subServices.balcony_lock',
        'Services.electrical.subServices.spot_light',
        'Services.electrical.subServices.led_light',
        'Services.electrical.subServices.light_bulb',
        'Services.electrical.subServices.chandelier',
        'Services.electrical.subServices.chair_repair',
        'Services.electrical.subServices.wood_door',
        'Services.electrical.subServices.fly_mesh',
        'Services.electrical.subServices.socket_plug',
        'Services.electrical.subServices.visit_only',
    ],
    image: 'https://placehold.co/1200x600.png',
    dataAiHint: 'electrical repair',
  },
  {
    slug: 'plumbing',
    titleKey: 'Services.plumbing.title',
    descriptionKey: 'Services.plumbing.description',
    icon: Wrench,
    detailsKey: 'Services.plumbing.details',
    subServiceKeys: [
        'Services.plumbing.subServices.house_pipe',
        'Services.plumbing.subServices.water_heater',
        'Services.plumbing.subServices.toilet_block',
        'Services.plumbing.subServices.sink_block',
        'Services.plumbing.subServices.angle_valve',
        'Services.plumbing.subServices.silicone',
        'Services.plumbing.subServices.hand_spray',
        'Services.plumbing.subServices.shower_set',
        'Services.plumbing.subServices.shower_head',
    ],
    image: 'https://placehold.co/1200x600.png',
    dataAiHint: 'plumbing work',
  },
  {
    slug: 'cleaning-services',
    titleKey: 'Services.cleaning.title',
    descriptionKey: 'Services.cleaning.description',
    icon: Sparkles,
    detailsKey: 'Services.cleaning.details',
    subServiceKeys: [
        'Services.cleaning.subServices.normal_studio',
        'Services.cleaning.subServices.normal_1bhk',
        'Services.cleaning.subServices.normal_2bhk',
        'Services.cleaning.subServices.hourly',
    ],
    image: 'https://placehold.co/1200x600.png',
    dataAiHint: 'deep cleaning',
  },
  {
    slug: 'pest-control',
    titleKey: 'Services.pest_control.title',
    descriptionKey: 'Services.pest_control.description',
    icon: Bug,
    detailsKey: 'Services.pest_control.details',
    subServiceKeys: [],
    image: 'https://placehold.co/1200x600.png',
    dataAiHint: 'pest control',
  }
];
