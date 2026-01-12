export interface Service {
  id: string;
  originalName: string; // The "boring" name
  redefinedName: string; // The Sintax name
  description: string;
}

export interface Plan {
  id: string;
  name: string;
  tagline: string;
  features: string[];
  priceLabel?: string;
}

export interface NavItem {
  label: string;
  href: string;
}