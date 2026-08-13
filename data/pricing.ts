import type { PricingTier } from '@/types/pricing';

export const pricingTiers: PricingTier[] = [
  {
    id: 'sketch',
    name: 'Sketch',
    priceRange: '$30 – $80',
    description: 'Clean pencil or ink sketches. Perfect for character concepts, quick portraits, or gesture studies.',
    deliveryTime: '3–5 days',
    ctaLabel: 'Order a Sketch',
    features: [
      { text: 'Bust or half-body sketch', included: true },
      { text: 'Single character', included: true },
      { text: '1 revision round', included: true },
      { text: 'High-res JPG export', included: true },
      { text: 'Full background', included: false },
      { text: 'Commercial license', included: false },
    ],
  },
  {
    id: 'character',
    name: 'Detailed Character',
    priceRange: '$80 – $220',
    description: 'Fully rendered character illustration with shading, detail work, and a simple or gradient background.',
    deliveryTime: '7–12 days',
    popular: true,
    ctaLabel: 'Commission a Character',
    features: [
      { text: 'Full body illustration', included: true },
      { text: 'Up to 2 characters', included: true },
      { text: '2 revision rounds', included: true },
      { text: 'High-res PNG + PSD export', included: true },
      { text: 'Simple background', included: true },
      { text: 'Commercial license', included: false },
    ],
  },
  {
    id: 'full',
    name: 'Full Illustration',
    priceRange: '$220 – $500',
    description: 'Cinematic, publication-quality illustration with full background, complex lighting, and unlimited detail.',
    deliveryTime: '14–21 days',
    ctaLabel: 'Start a Project',
    features: [
      { text: 'Full scene illustration', included: true },
      { text: 'Multiple characters', included: true },
      { text: '3 revision rounds', included: true },
      { text: 'All source files included', included: true },
      { text: 'Detailed background', included: true },
      { text: 'Commercial license', included: true },
    ],
  },
];
