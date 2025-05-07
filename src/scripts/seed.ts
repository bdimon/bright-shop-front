// scripts/seed.ts
import { supabase } from "../lib/supabase";
import { v4 as uuidv4 } from "uuid";

async function seedProducts() {
  const products = Array.from({ length: 100 }, (_, i) => ({
    id: uuidv4(),
    name: `Вязаное изделие #${i + 1}`,
    price: Math.floor(Math.random() * 3000) + 500,
    quantity: Math.floor(Math.random() * 20) + 1, // от 1 до 20 штук
    description: `Уникальное изделие ручной вязки. Модель #${i + 1}.`,
    images: [
      `https://via.placeholder.com/300x300.png?text=Item+${i + 1}`,
      `https://via.placeholder.com/300x300.png?text=Item+${i + 1}+Alt`,
    ],
  }));

  const { error } = await supabase.from("products").insert(products);

  if (error) {
    console.error("Ошибка при вставке товаров:", error.message);
  } else {
    console.log("100 товаров успешно добавлены!");
  }
}

seedProducts();
