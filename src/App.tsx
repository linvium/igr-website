import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";
import BiodiversityCenter from "./pages/Centers/BiodiversityCenter";
import GeneBank from "./pages/Centers/GeneBank";
import ProtectedArea from "./pages/Centers/ProtectedArea";
import BotanicalGarden from "./pages/Centers/BotanicalGarden";
import Nursery from "./pages/Centers/Nursery";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projekti" element={<Projects />} />
          <Route path="/centri/biodiverzitet" element={<BiodiversityCenter />} />
          <Route path="/centri/banka-gena" element={<GeneBank />} />
          <Route path="/centri/zasticeno-podrucje" element={<ProtectedArea />} />
          <Route path="/centri/botanicka-basta" element={<BotanicalGarden />} />
          <Route path="/centri/rasadnik" element={<Nursery />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
