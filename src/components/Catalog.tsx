
import React, { useState, useEffect, useRef } from 'react';
import ProductCard, { Product } from './ProductCard';
import { Button } from '@/components/ui/button';

// Mock products data
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Кухонный комбайн MultiFresh",
    price: 12990,
    image: "https://images.unsplash.com/photo-1585037328534-a60c6e170e37?q=80&w=1888&auto=format&fit=crop",
    category: "Техника для кухни",
    isNew: true
  },
  {
    id: 2,
    name: "Беспроводной пылесос PowerClean",
    price: 8990,
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=1780&auto=format&fit=crop",
    category: "Бытовая техника",
    isSale: true,
    salePrice: 7490
  },
  {
    id: 3,
    name: "Умная колонка HomeAssistant",
    price: 5990,
    image: "https://images.unsplash.com/photo-1589003511513-f85a13d0dbf2?q=80&w=1964&auto=format&fit=crop",
    category: "Умный дом"
  },
  {
    id: 4,
    name: "Кофемашина BaristaPro",
    price: 18990,
    image: "https://images.unsplash.com/photo-1578358679425-5144f0ebe723?q=80&w=1964&auto=format&fit=crop",
    category: "Техника для кухни"
  },
  {
    id: 5,
    name: "Робот-пылесос CleanBot X2",
    price: 21990,
    image: "https://images.unsplash.com/photo-1673462788899-9cfec8c744e4?q=80&w=1780&auto=format&fit=crop",
    category: "Бытовая техника",
    isNew: true
  },
  {
    id: 6,
    name: "Увлажнитель воздуха AeroFresh",
    price: 4990,
    image: "https://images.unsplash.com/photo-1581508823585-1cd1da01189a?q=80&w=1935&auto=format&fit=crop",
    category: "Климатическая техника",
    isSale: true,
    salePrice: 3990
  },
  {
    id: 7,
    name: "Блендер PowerMix Pro",
    price: 3490,
    image: "https://images.unsplash.com/photo-1612883835238-7eb3df7de0cb?q=80&w=1887&auto=format&fit=crop",
    category: "Техника для кухни"
  },
  {
    id: 8,
    name: "Умные весы FitTrack",
    price: 2990,
    image: "https://images.unsplash.com/photo-1590412634277-168e6946a079?q=80&w=1964&auto=format&fit=crop",
    category: "Товары для здоровья"
  }
];

// Filter category options
const CATEGORIES = ["Все", "Техника для кухни", "Бытовая техника", "Умный дом", "Климатическая техника", "Товары для здоровья"];

const Catalog = () => {
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const catalogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        threshold: 0.1
      }
    );

    if (catalogRef.current) {
      observer.observe(catalogRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (selectedCategory === "Все") {
      setDisplayedProducts(PRODUCTS);
    } else {
      setDisplayedProducts(PRODUCTS.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory]);

  return (
    <section id="catalog" className="py-20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-shop-text">Каталог товаров</h2>
          <div className="w-24 h-1 bg-shop-blue-dark mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Мы предлагаем только качественные товары от проверенных поставщиков
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {CATEGORIES.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={selectedCategory === category 
                ? "bg-shop-blue-dark hover:bg-shop-blue-dark/90 text-white"
                : "text-shop-text border-shop-blue hover:bg-shop-blue/10"
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div 
          ref={catalogRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8"
        >
          {displayedProducts.map((product, index) => (
            <div 
              key={product.id}
              className={`transition-all duration-500 transform ${
                isVisible 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button 
            className="bg-shop-peach text-shop-text hover:bg-shop-peach-dark hover:text-white px-8 py-6 text-lg rounded-full"
          >
            Показать больше товаров
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Catalog;
