import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import  Catalog  from "./components/Catalog";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import { Link } from "react-router-dom";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <header className="p-4 bg-gray-100 shadow mb-4">
            <nav className="flex gap-4">
              <Link to="/" className="text-blue-600 hover:underline">Главная</Link>
              <Link to="/catalog" className="text-blue-600 hover:underline">Каталог</Link>
              <Link to="/cart" className="text-blue-600 hover:underline">Корзина</Link>
            </nav>
          </header>
        <Routes>
          
          <Route path="/" element={<Index />} />
          <Route path="/catalog" element={<Catalog />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/catalog/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
