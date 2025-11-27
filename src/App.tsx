import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Ramble from "./pages/Ramble";
import Tierly from "./pages/Tierly";
import SmokeFree from "./pages/SmokeFree";
import Marketing from "./pages/Marketing";
import MarketingForFounders from "./pages/MarketingForFounders";
import FeedbackMap from "./pages/FeedbackMap";
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
          <Route path="/ramble" element={<Ramble />} />
          <Route path="/tierly" element={<Tierly />} />
          <Route path="/quitesmoking" element={<SmokeFree />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/marketing-for-founders" element={<MarketingForFounders />} />
          <Route path="/feedback-map" element={<FeedbackMap />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
