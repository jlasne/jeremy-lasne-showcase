import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Ramble from "./pages/Ramble";
import Tierly from "./pages/Tierly";
import TheFoundersMarketingMap from "./pages/TheFoundersMarketingMap";
import TalkToUsers from "./pages/marketing/TalkToUsers";
import LandingPage from "./pages/marketing/LandingPage";
import Distribution from "./pages/marketing/Distribution";
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
          <Route path="/the-founders-marketing-map" element={<TheFoundersMarketingMap />} />
          <Route path="/the-founders-marketing-map/talk-to-users" element={<TalkToUsers />} />
          <Route path="/the-founders-marketing-map/landing-page" element={<LandingPage />} />
          <Route path="/the-founders-marketing-map/distribution" element={<Distribution />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
