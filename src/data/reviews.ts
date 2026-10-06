export interface CustomerReview {
  id: string;
  name: string;
  address: string;
  location?: string;
  description: string;
  image: string;
  rate: number; // 1 to 5
}

export const CUSTOMER_REVIEWS: CustomerReview[] = [];
