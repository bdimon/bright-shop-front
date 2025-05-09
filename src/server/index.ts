import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import authRegister from "../routes/auth/register";
import authLogin from "../routes/auth/login";
import productRoutes from "../routes/products";
import userRoutes from "../routes/users";
import orderRoutes from "../routes/orders";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth/register", authRegister);
app.use("/api/auth/login", authLogin);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/** ---------------------- USERS ---------------------- **/

// 🔁 Получить всех пользователей
app.get("/api/users", async (_, res) => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});


const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`🟢 API сервер запущен на http://localhost:${PORT}`);
});

