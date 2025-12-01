import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
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
          <Route path="/" element={<Home />} />
          <Route path="/interview" element={<Index />} />
          <Route path="/interview/ramble" element={<Ramble />} />
          <Route path="/interview/tierly" element={<Tierly />} />
          <Route path="/interview/quitesmoking" element={<SmokeFree />} />
          <Route path="/interview/marketing" element={<Marketing />} />
          <Route path="/interview/marketing-for-founders" element={<MarketingForFounders />} />
          <Route path="/interview/feedback-map" element={<FeedbackMap />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
