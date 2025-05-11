import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";
import { faker } from "@faker-js/faker";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// async function seed() {
//   console.log("🔁 Начинаем сидирование...");

// 1. Очистка таблиц
//   async function clearTable(tableName: string) {
//     const { error } = await supabase.rpc("truncate_table", { table_name: tableName }); // supabase.from(tableName")
//     if (error) {
//       console.error(`Ошибка при очистке таблицы ${tableName}:`, error);
//     } else {
//       console.log(`🧹 Таблица ${tableName} очищена`);
//     }
//   }
async function clearTable(tableName: string) {
  const { data, error, count } = await supabase
    .from(tableName)
    .delete({ count: "exact" })
    .not("id", "is", null); // Удалить все строки

  if (error) {
    console.error(`❌ Ошибка при очистке таблицы ${tableName}:`, error);
  } else {
    console.log(`🧹 Таблица ${tableName} очищена. Удалено строк: ${count}`);
  }
}

// 2. Сидинг продуктов
// async function seedProducts() {
//   const products = Array.from({ length: 100 }, (_, i) => ({
//     id: uuidv4(),
//     name: `Продукт #${i + 1}`,
//     price: Math.floor(Math.random() * 3000) + 500,
//     quantity: Math.floor(Math.random() * 20) + 1,
//     description: `Описание продукта #${i + 1}`,
//     images: [
//       `https://via.placeholder.com/300x300.png?text=Item+${i + 1}`,
//       `https://via.placeholder.com/300x300.png?text=Item+${i + 1}+Alt`,
//     ],
//     isnew: Math.random() < 0.5,
//     issale: Math.random() < 0.5,
//     saleprice: Math.floor(Math.random() * 500) + 100,
//   }));

//   const { error } = await supabase.from("products").insert(products);
//   if (error) {
//     console.error("Ошибка при добавлении продуктов:", error);
//   } else {
//     console.log("🧶 Добавлены 100 продуктов");
//   }
// }

// 2. Сидинг продуктов с факером
async function seedProducts() {
  const categories = ["Все", "Шапки", "Шарфы и снуды", "Комплекты"];
  const products = Array.from({ length: 10 }, (_, i) => ({
    id: uuidv4(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    quantity: Math.floor(Math.random() * 20) + 1,
    description: faker.commerce.productDescription(),
    images: [faker.image.urlPicsumPhotos(), faker.image.urlPicsumPhotos()],
    isnew: Math.random() < 0.5,
    issale: Math.random() < 0.5,
    saleprice: faker.commerce.price(),
    category: `{${categories[
      Math.floor(Math.random() * (categories.length - 1))
    ].toLowerCase()}}`,
  }));

  const { error } = await supabase.from("products").insert(products);
  if (error) {
    console.error("Ошибка при добавлении продуктов:", error);
  } else {
    console.log("🧶 Добавлены 10 продуктов");
  }
}
  // 3. Сидинг пользователей
  async function seedUsers() {
    const users = Array.from({ length: 5 }, (_, i) => ({
      id: uuidv4(),
      email: `user${i + 1}@test.com`,
      full_name: `Пользователь ${i + 1}`,
      created_at: new Date().toISOString(),
    }));
    const { error } = await supabase.from("users").insert(users);
    if (error) {
      console.error("Ошибка при добавлении пользователей:", error);
    } else {
      console.log("👤 Добавлены 5 пользователей");
    }
  }
 
  // 4. Сидинг заказов
  async function seedOrders() {
    const users = await supabase.from("users").select("id");
    if (users.data) {
      const orders = users.data.flatMap((user) =>
      Array.from({ length: 2 }, () => ({
        id: uuidv4(),
        user_id: user.id,
        total: Math.floor(Math.random() * 5000) + 1000,
        status: "created",
        items: {
          quantity: Math.floor(Math.random() * 5) + 1,
          price: Math.floor(Math.random() * 3000) + 500,
        },
        created_at: new Date().toISOString(),
      }))
    );
    const { error } = await supabase.from("orders").insert(orders);
    if (error) {
      console.error("Ошибка при добавлении заказов:", error);
    } else {
      console.log("📦 Добавлены 10 заказов");
    }
  } else {
    console.error("Ошибка при получении пользователей:", users.error);
  }
  }
    
  
async function seed() {
  
  console.log("🔁 Начинаем сидирование...");

  // Очистка таблиц
  
  await clearTable("orders");
  await clearTable("products");
  const { count } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true });

  console.log("🧮 Продуктов осталось:", count);

  await clearTable("users");
  await new Promise((res) => setTimeout(res, 1000));
  // Сидирование
  await seedProducts();
  await seedUsers();
  await seedOrders();
  

  console.log("✅ Сидирование завершено!");
}

seed();
/* 
select * from pg_proc where proname = 'truncate_table';
DROP FUNCTION IF EXISTS truncate_table(text);


CREATE OR REPLACE FUNCTION truncate_table(table_name text)
RETURNS void AS $$
BEGIN
    EXECUTE format('TRUNCATE TABLE %I CASCADE', table_name);
END;
$$ LANGUAGE plpgsql;
Вы можете проверить существующие политики с помощью следующего запроса:
SELECT * FROM information_schema.policies WHERE table_name = 'users';


*/
