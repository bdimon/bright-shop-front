import React from 'react';
import { supabase } from "@/lib/supabase";
import { Product } from '../services/products';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';


interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//   const supabase = useSupabaseClient();

  const [productData, setProductData] = React.useState<Product>(product);

  React.useEffect(() => {
    const fetchProductData = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, price, description, quantity, images')
        .eq('id', product.id);

      if (error) {
        console.error(error);
      } else {
        setProductData(data[0]);
      }
    };

    fetchProductData();
  }, [product.id, supabase]);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
      <div className="relative h-64 overflow-hidden">
        <img
          src={productData.images[0]}
          alt={productData.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {productData.isNew && (
          <div className="absolute top-3 left-3 bg-shop-blue-dark text-white text-xs font-bold uppercase py-1 px-2 rounded">
            Новинка
          </div>
        )}
        {productData.isSale && (
          <div className="absolute top-3 right-3 bg-[#FF5252] text-white text-xs font-bold uppercase py-1 px-2 rounded">
            Скидка
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="text-sm text-gray-500 mb-1">{productData.category}</div>
        <h3 className="text-lg font-semibold mb-2 text-shop-text transition-colors group-hover:text-shop-blue-dark">
          {productData.name}
        </h3>
        <div className="flex justify-between items-center">
          <div>
            {productData.isSale && productData.salePrice ? (
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-shop-text">{productData.salePrice}₽</span>
                <span className="text-sm text-gray-500 line-through">{productData.price}₽</span>
              </div>
            ) : (
              <span className="text-xl font-bold text-shop-text">{productData.price}₽</span>
            )}
          </div>
          <Button
            className="bg-shop-blue-dark text-white hover:bg-shop-blue-dark/90 rounded-full p-2 h-10 w-10"
            aria-label="Добавить в корзину"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;