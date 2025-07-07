import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AcceptedOrders from "./pages/AcceptedOrders";
import PreparedOrders from "./pages/PreparedOrders";
import DeliveredOrders from "./pages/DeliveredOrders";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/accepted-orders" element={<AcceptedOrders />} />
          <Route path="/accepted" element={<AcceptedOrders />} />
          <Route path="/prepared-orders" element={<PreparedOrders />} />
          <Route path="/delivered-orders" element={<DeliveredOrders />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
