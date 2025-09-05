import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GetNewLeads from "./pages/GetNewLeads";
import ClientFeedback from "./pages/ClientFeedback";
import Sellers from "./pages/Sellers";
import Buyers from "./pages/Buyers";
import Agents from "./pages/Agents";
import Businesses from "./pages/Businesses";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/get-new-leads" element={<GetNewLeads />} />
          <Route path="/client-feedback" element={<ClientFeedback />} />
          <Route path="/sellers" element={<Sellers />} />
          <Route path="/buyers" element={<Buyers />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/businesses" element={<Businesses />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
