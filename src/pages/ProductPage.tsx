import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Product } from '@/components/ProductCard';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3010/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error("Ошибка загрузки продукта:", err));
  }, [id]);

  if (!product) return <div className="p-4">Загрузка...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <img src={product.images[0]} alt={product.name} className="w-80 rounded mb-4" />
      <p className="text-gray-600">{product.description}</p>
      <p className="text-lg font-semibold mt-2">{product.price} ₽</p>
    </div>
  );
}

