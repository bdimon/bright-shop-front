import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

async function seed() {
  console.log("🔁 Начинаем сидирование...");

  // 1. Очистка таблиц
  await supabase.from("orders").delete().neq("id", "");
  await supabase.from("users").delete().neq("id", "");
  await supabase.from("products").delete().neq("id", "");
  console.log("🧹 Таблицы очищены");

  // 2. Сидинг продуктов
  const products = Array.from({ length: 100 }, (_, i) => ({
    id: uuidv4(),
    name: `Вязаное изделие #${i + 1}`,
    price: Math.floor(Math.random() * 3000) + 500,
    quantity: Math.floor(Math.random() * 20) + 1,
    description: `Уникальное изделие ручной вязки. Модель #${i + 1}.`,
    images: [
      `https://via.placeholder.com/300x300.png?text=Item+${i + 1}`,
      `https://via.placeholder.com/300x300.png?text=Item+${i + 1}+Alt`,
    ],
  }));
  await supabase.from("products").insert(products);
  console.log("🧶 Добавлены 100 товаров");

  // 3. Сидинг пользователей
  const users = Array.from({ length: 5 }, (_, i) => ({
    id: uuidv4(),
    email: `user${i + 1}@test.com`,
    full_name: `Тестовый Пользователь ${i + 1}`,
    created_at: new Date().toISOString(),
  }));
  await supabase.from("users").insert(users);
  console.log("👤 Добавлены 5 пользователей");

  // 4. Сидинг заказов
  const orders = users.flatMap((user) =>
    Array.from({ length: 2 }, () => {
      const total = Math.floor(Math.random() * 5000) + 1000;
      return {
        id: uuidv4(),
        user_id: user.id,
        total,
        status: "created",
        items: [
          { product_id: uuidv4(), quantity: 1 },
          { product_id: uuidv4(), quantity: 2 },
        ],
        created_at: new Date().toISOString(),
      };
    })
  );
  await supabase.from("orders").insert(orders);
  console.log("📦 Добавлены 10 заказов");

  console.log("✅ Сидирование завершено!");
}

seed();
