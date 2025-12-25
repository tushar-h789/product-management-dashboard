export interface Review {
    rating: number;
    comment: string;
    reviewerName: string;
    date: string;
  }

export interface Dimensions {
    width: number;
    height: number;
    depth: number;
  }

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  category: string;
  brand: string;
  thumbnail: string;
  images: string[];
  availabilityStatus: string;
  warrantyInformation: string;
  shippingInformation: string;
  returnPolicy: string;
  reviews: Review[];
  dimensions: Dimensions;
}


export interface CategorySidebarProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductCardItemProps {
  product: Product;
}