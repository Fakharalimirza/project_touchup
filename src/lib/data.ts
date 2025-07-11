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
    image: 'https://firebasestorage.googleapis.com/v0/b/touchup-42i8o.firebasestorage.app/o/painting.png?alt=media&token=cd8e0f87-467e-433f-9ce8-2060f7e8345e',
    dataAiHint: 'wall painting',
  },
  {
    slug: 'electrical-repair',
    titleKey: 'electrical-repair.title',
    descriptionKey: 'electrical-repair.description',
    icon: Zap,
    detailsKey: 'electrical-repair.details',
    subServiceKeys: [
        'electrical-repair.subServices.balcony_lock',
        'electrical-repair.subServices.spot_light',
        'electrical-repair.subServices.led_light',
        'electrical-repair.subServices.light_bulb',
        'electrical-repair.subServices.chandelier',
        'electrical-repair.subServices.chair_repair',
        'electrical-repair.subServices.wood_door',
        'electrical-repair.subServices.fly_mesh',
        'electrical-repair.subServices.socket_plug',
        'electrical-repair.subServices.visit_only',
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
    titleKey: 'cleaning-services.title',
    descriptionKey: 'cleaning-services.description',
    icon: Sparkles,
    detailsKey: 'cleaning-services.details',
    subServiceKeys: [
        'cleaning-services.subServices.normal_studio',
        'cleaning-services.subServices.normal_1bhk',
        'cleaning-services.subServices.normal_2bhk',
        'cleaning-services.subServices.hourly',
    ],
    image: 'https://placehold.co/1200x600.png',
    dataAiHint: 'deep cleaning',
  },
  {
    slug: 'pest-control',
    titleKey: 'pest-control.title',
    descriptionKey: 'pest-control.description',
    icon: Bug,
    detailsKey: 'pest-control.details',
    subServiceKeys: [],
    image: 'https://placehold.co/1200x600.png',
    dataAiHint: 'pest control',
  }
];
