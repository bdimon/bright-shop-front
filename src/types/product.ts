export interface RawProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  images: string[];
  category: string[]; // если массив
  isnew: boolean;
  issale: boolean;
  saleprice: number | null;
  created_at: string;
}
