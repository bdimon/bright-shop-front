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
/*
export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:3010/api/products");
  if (!res.ok) throw new Error("Не удалось загрузить товары");
  return res.json();
}

export async function fetchProduct(id: string): Promise<Product> {
  const res = await fetch(`http://localhost:3010/api/products/${id}`);
  if (!res.ok) throw new Error("Не удалось загрузить товар");
  return res.json();
}
*/