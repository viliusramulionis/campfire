export interface CartItem {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Accessory {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SpecItem {
  label: string;
  value: string;
  highlight?: boolean;
}
