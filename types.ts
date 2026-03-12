import type {Money} from './cart';

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductImage = {
  id: string;
  url: string;
};

export type SelectedOption = {
  name: string;
  value: string;
};

export type ProductVariant = {
  id: string;
  title: string;
  quantityAvailable: number | null;
  availableForSale: boolean;
  currentlyNotInStock: boolean;
  price: Money;
  compareAtPrice?: Money | null;
  selectedOptions: SelectedOption[];
  image?: ProductImage;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  productType: string;
  images: ProductImage[];
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  options: ProductOption[];
  variants: ProductVariant[];
};

