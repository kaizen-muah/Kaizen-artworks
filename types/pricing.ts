export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingTier {
  id: string;
  name: string;
  priceRange: string;
  description: string;
  features: PricingFeature[];
  deliveryTime: string;
  popular?: boolean;
  ctaLabel: string;
}
